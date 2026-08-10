import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { ArrowLeft, Loader2, CheckCircle2, Zap, AlertCircle } from 'lucide-react';
import { FormInput } from './FormInput';
import { FormTextarea } from './FormTextarea';
import { FormSelect } from './FormSelect';
import { ArtisanSelector } from './ArtisanSelector';
import { JobFormData, TRADE_TYPES } from '../types/job';
import { xlmToStroops, formatStroops, formatXlm } from '../utils/currency';
import { mockCreateJob } from '../utils/mockApi';

// Estimated gas fee in XLM per transaction
const ESTIMATED_GAS_FEE_XLM = 0.00001;

interface JobFormProps {
  onCancel: () => void;
  onSuccess: (jobId: string) => void;
}

export function JobForm({ onCancel, onSuccess }: JobFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [createdJobId, setCreatedJobId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isDirty }
  } = useForm<JobFormData>({
    defaultValues: {
      description: '',
      tradeType: undefined,
      amount: '',
      artisanPublicKey: '',
      jobDetails: ''
    }
  });

  const amountXlm = parseFloat(watch('amount') || '0') || 0;
  const amountStroops = xlmToStroops(amountXlm);
  const totalXlm = amountXlm + ESTIMATED_GAS_FEE_XLM;

  const onSubmit = async (data: JobFormData) => {
    setSubmitting(true);
    setSubmitError(null);

    try {
      const result = await mockCreateJob(data);
      setCreatedJobId(result.jobId);
      onSuccess(result.jobId);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  // --- Success state ---
  if (createdJobId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg p-8 max-w-md w-full text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-100 to-green-50 rounded-2xl mb-4 mx-auto">
            <CheckCircle2 size={32} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Job Created!</h2>
          <p className="text-gray-600 mb-6">Your job has been submitted to the escrow contract.</p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-1">Job ID</p>
            <p className="text-lg font-bold text-gray-900 break-all">{createdJobId}</p>
          </div>
          <button 
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-bold hover:from-blue-700 hover:to-blue-600 transition shadow-lg"
            onClick={onCancel}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // --- Form state ---
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto p-4">
        <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg p-6">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
            <button
              type="button"
              className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-600"
              onClick={onCancel}
              disabled={submitting}
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <p className="text-xs font-bold text-blue-600 uppercase tracking-wide">Create job</p>
              <h1 className="text-2xl font-bold text-gray-900">New job record</h1>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
            {/* --- Section: Job Info --- */}
            <fieldset>
              <legend className="block text-sm font-bold text-gray-900 mb-4 pb-3 border-b-2 border-blue-200">Job Information</legend>

              <FormInput
                label="Job Description"
                name="description"
                placeholder="e.g. Fix burst pipe in the kitchen"
                required
                error={errors.description?.message}
                register={register('description', {
                  required: 'Job description is required',
                  minLength: { value: 10, message: 'Description must be at least 10 characters' },
                  maxLength: { value: 200, message: 'Description cannot exceed 200 characters' }
                })}
                disabled={submitting}
              />

              <FormSelect
                label="Trade Type"
                name="tradeType"
                options={TRADE_TYPES}
                placeholder="Select a trade"
                required
                error={errors.tradeType?.message}
                register={register('tradeType', {
                  required: 'Please select a trade type'
                })}
                disabled={submitting}
              />

              <FormTextarea
                label="Job Details"
                name="jobDetails"
                placeholder="Provide additional details about the job scope, materials needed, access instructions, etc."
                required
                rows={4}
                error={errors.jobDetails?.message}
                register={register('jobDetails', {
                  required: 'Job details are required',
                  minLength: { value: 20, message: 'Job details must be at least 20 characters' }
                })}
                disabled={submitting}
              />
            </fieldset>

            {/* --- Section: Artisan --- */}
            <fieldset>
              <legend className="block text-sm font-bold text-gray-900 mb-4 pb-3 border-b-2 border-blue-200">Artisan Selection</legend>

              <Controller
                name="artisanPublicKey"
                control={control}
                rules={{ required: 'Please select an artisan' }}
                render={({ field }) => (
                  <ArtisanSelector
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.artisanPublicKey?.message}
                    disabled={submitting}
                  />
                )}
              />
            </fieldset>

            {/* --- Section: Payment --- */}
            <fieldset>
              <legend className="block text-sm font-bold text-gray-900 mb-4 pb-3 border-b-2 border-blue-200">Payment</legend>

              <FormInput
                label="Amount (XLM)"
                name="amount"
                type="number"
                placeholder="0.0000000"
                required
                helperText={
                  amountXlm > 0
                    ? `= ${formatStroops(amountStroops)} stroops`
                    : 'Enter amount in XLM — auto-converted to stroops'
                }
                error={errors.amount?.message}
                register={register('amount', {
                  required: 'Amount is required',
                  validate: {
                    positive: (v: string) =>
                      parseFloat(v) > 0 || 'Amount must be greater than 0',
                    minimum: (v: string) =>
                      parseFloat(v) >= 0.0000001 || 'Minimum amount is 1 stroop (0.0000001 XLM)'
                  }
                })}
                disabled={submitting}
              />

              {/* Fee breakdown */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-gray-700">
                    <Zap size={14} className="text-blue-600" />
                    Job amount
                  </span>
                  <span className="font-bold text-gray-900">{formatXlm(amountXlm)} XLM</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-gray-700">
                    <Zap size={14} className="text-blue-600" />
                    Estimated gas fee
                  </span>
                  <span className="font-bold text-gray-900">{formatXlm(ESTIMATED_GAS_FEE_XLM)} XLM</span>
                </div>
                <div className="border-t border-blue-300 pt-3 flex items-center justify-between">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="text-lg font-bold text-blue-600">{formatXlm(totalXlm)} XLM</span>
                </div>
              </div>
            </fieldset>

            {/* --- Submit error --- */}
            {submitError && (
              <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg" role="alert">
                <AlertCircle size={20} className="text-red-600 flex-shrink-0" />
                <p className="text-sm text-red-700 font-medium">{submitError}</p>
              </div>
            )}

            {/* --- Actions --- */}
            <div className="flex gap-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-50 transition"
                onClick={onCancel}
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-bold hover:from-blue-700 hover:to-blue-600 transition shadow-lg flex items-center justify-center gap-2"
                disabled={submitting || !isDirty}
              >
                {submitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Submitting…
                  </>
                ) : (
                  'Create Job'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
