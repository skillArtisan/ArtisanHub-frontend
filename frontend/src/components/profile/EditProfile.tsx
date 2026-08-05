import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Upload,
  X,
  Save,
  Plus,
  Trash2,
  Clock,
  MapPin,
  Phone,
  Mail,
  ArrowLeft
} from 'lucide-react';
import { Artisan, TradeSpecialization } from '../../data/mockArtisanData';
import { FormInput } from '../FormInput';
import { FormTextarea } from '../FormTextarea';
import { FormSelect } from '../FormSelect';

interface EditProfileProps {
  artisan: Artisan;
  onSave: (updatedArtisan: Artisan) => void;
  onCancel: () => void;
}

const TRADE_TYPES: TradeSpecialization[] = [
  "Plumbing",
  "Electrical",
  "Carpentry",
  "Painting",
  "Welding",
  "Tiling",
  "Masonry",
  "HVAC",
  "General"
];

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const EditProfile: React.FC<EditProfileProps> = ({ artisan, onSave, onCancel }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      name: artisan.name,
      bio: artisan.bio,
      location: artisan.location,
      phone: '',
      email: ''
    }
  });

  const [profilePicture, setProfilePicture] = useState<string | null>(artisan.profilePictureUrl || null);
  const [specializations, setSpecializations] = useState<TradeSpecialization[]>(artisan.specializations);
  const [selectedSpec, setSelectedSpec] = useState<TradeSpecialization>('Plumbing');
  const [businessHours, setBusinessHours] = useState(artisan.businessHours);
  const [availableDates, setAvailableDates] = useState<string[]>(artisan.availabilityCalendar);

  const handleProfilePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSpecialization = () => {
    if (!specializations.includes(selectedSpec)) {
      setSpecializations([...specializations, selectedSpec]);
    }
  };

  const handleRemoveSpecialization = (spec: TradeSpecialization) => {
    setSpecializations(specializations.filter(s => s !== spec));
  };

  const handleBusinessHourChange = (day: string, field: 'startTime' | 'endTime', value: string) => {
    const dayKey = day.toLowerCase() as keyof typeof businessHours;
    setBusinessHours({
      ...businessHours,
      [dayKey]: {
        ...businessHours[dayKey],
        [field]: value,
        day: day
      }
    });
  };

  const handleToggleDay = (day: string) => {
    const dayKey = day.toLowerCase() as keyof typeof businessHours;
    if (businessHours[dayKey]) {
      setBusinessHours({
        ...businessHours,
        [dayKey]: null
      });
    } else {
      setBusinessHours({
        ...businessHours,
        [dayKey]: {
          day: day,
          startTime: '09:00',
          endTime: '17:00'
        }
      });
    }
  };

  const handleAddAvailableDate = (date: string) => {
    if (date && !availableDates.includes(date)) {
      setAvailableDates([...availableDates, date]);
    }
  };

  const handleRemoveAvailableDate = (date: string) => {
    setAvailableDates(availableDates.filter(d => d !== date));
  };

  const onSubmit = (data: any) => {
    const updatedArtisan: Artisan = {
      ...artisan,
      name: data.name,
      bio: data.bio,
      location: data.location,
      profilePictureUrl: profilePicture || artisan.profilePictureUrl,
      specializations,
      businessHours,
      availabilityCalendar: availableDates
    };
    onSave(updatedArtisan);
  };

  return (
    <div className="edit-profile-container">
      <div className="edit-profile-header">
        <button onClick={onCancel} className="ghost-action" aria-label="Back">
          <ArrowLeft size={18} />
          Back
        </button>
        <h1>Edit Profile</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="edit-profile-form">
        {/* Profile Picture Section */}
        <section className="form-section">
          <h2>Profile Picture</h2>
          <div className="profile-picture-upload">
            {profilePicture ? (
              <div className="profile-picture-preview">
                <img src={profilePicture} alt="Profile" />
                <button
                  type="button"
                  onClick={() => setProfilePicture(null)}
                  className="ghost-action danger-action"
                  aria-label="Remove picture"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="profile-picture-placeholder">
                <div
                  className="profile-avatar-large"
                  style={{ background: artisan.avatarColor }}
                >
                  {artisan.avatarInitials}
                </div>
              </div>
            )}
            <label className="file-input-label">
              <Upload size={16} />
              Upload Picture
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePictureUpload}
                hidden
              />
            </label>
          </div>
        </section>

        {/* Personal Information */}
        <section className="form-section">
          <h2>Personal Information</h2>
          <FormInput
            label="Full Name"
            {...register('name', { required: 'Name is required' })}
            error={errors.name?.message}
          />
          <FormInput
            label="Phone Number"
            type="tel"
            {...register('phone')}
            placeholder="+234 (0) 123-456-7890"
          />
          <FormInput
            label="Email Address"
            type="email"
            {...register('email')}
          />
          <FormInput
            label="Location"
            {...register('location', { required: 'Location is required' })}
            error={errors.location?.message}
          />
          <FormTextarea
            label="Bio"
            {...register('bio')}
            placeholder="Tell customers about your experience and expertise..."
            rows={4}
          />
        </section>

        {/* Specializations */}
        <section className="form-section">
          <h2>Service Categories</h2>
          <div className="specializations-input">
            <FormSelect
              label="Add Category"
              value={selectedSpec}
              onChange={(e) => setSelectedSpec(e.target.value as TradeSpecialization)}
              options={TRADE_TYPES.map(t => ({ value: t, label: t }))}
            />
            <button
              type="button"
              onClick={handleAddSpecialization}
              className="secondary-action"
              aria-label="Add category"
            >
              <Plus size={16} />
              Add
            </button>
          </div>

          <div className="specializations-list">
            {specializations.map((spec) => (
              <div key={spec} className="specialization-tag">
                <span>{spec}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSpecialization(spec)}
                  className="ghost-action"
                  aria-label={`Remove ${spec}`}
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Business Hours */}
        <section className="form-section">
          <h2>Business Hours</h2>
          <div className="business-hours-grid">
            {DAYS_OF_WEEK.map((day) => {
              const dayKey = day.toLowerCase() as keyof typeof businessHours;
              const dayHours = businessHours[dayKey];
              return (
                <div key={day} className="business-hours-day">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={dayHours !== null}
                      onChange={() => handleToggleDay(day)}
                    />
                    <span>{day}</span>
                  </label>
                  {dayHours && (
                    <div className="business-hours-inputs">
                      <input
                        type="time"
                        value={dayHours.startTime}
                        onChange={(e) => handleBusinessHourChange(day, 'startTime', e.target.value)}
                      />
                      <span>to</span>
                      <input
                        type="time"
                        value={dayHours.endTime}
                        onChange={(e) => handleBusinessHourChange(day, 'endTime', e.target.value)}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Availability Calendar */}
        <section className="form-section">
          <h2>Availability Calendar</h2>
          <div className="availability-input">
            <input
              type="date"
              id="available-date-input"
              className="date-input"
            />
            <button
              type="button"
              onClick={() => {
                const input = document.getElementById('available-date-input') as HTMLInputElement;
                if (input.value) {
                  handleAddAvailableDate(input.value);
                  input.value = '';
                }
              }}
              className="secondary-action"
            >
              <Plus size={16} />
              Add Date
            </button>
          </div>

          <div className="available-dates-list">
            {availableDates.map((date) => (
              <div key={date} className="available-date-tag">
                <Clock size={14} />
                <span>{new Date(date).toLocaleDateString()}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveAvailableDate(date)}
                  className="ghost-action"
                  aria-label={`Remove ${date}`}
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Form Actions */}
        <div className="edit-profile-actions">
          <button
            type="button"
            onClick={onCancel}
            className="secondary-action"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="primary-action"
          >
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
