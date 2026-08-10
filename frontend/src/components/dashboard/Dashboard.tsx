import React from "react";
import {
  ShieldCheck,
  Hammer,
  AlertTriangle,
  CheckSquare,
  TrendingUp,
  RefreshCw,
  Clock,
  Activity,
  Users,
  BarChart3,
  Award,
} from "lucide-react";
import { useDashboard } from "../../hooks/useDashboard";
import { MetricCard } from "./MetricCard";
import { HealthBadge } from "./HealthBadge";
import { ActivityFeed } from "./ActivityFeed";
import {
  JobsByStatusChart,
  CompletionTrendChart,
  ArtisanEarningsChart,
} from "./Charts";
import { MetricPanelSkeleton } from "../Skeleton";

function formatXLM(val: number): string {
  if (val >= 1_000_000) return `${(val / 1_000_000).toFixed(2)}M XLM`;
  if (val >= 1_000) return `${(val / 1_000).toFixed(1)}K XLM`;
  return `${val.toLocaleString("en-US", { maximumFractionDigits: 1 })} XLM`;
}

export const Dashboard: React.FC<{ onCreateJob?: () => void }> = ({ onCreateJob }) => {
  const { metrics, loading, error, lastUpdated, refresh, countdown } = useDashboard();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-blue-600 uppercase tracking-wide">Dashboard</p>
              <h1 className="text-2xl font-bold text-gray-900">ArtisanHub Settlement Board</h1>
            </div>
            <div className="flex items-center gap-3">
              {onCreateJob && (
                <button 
                  onClick={onCreateJob}
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-bold hover:from-blue-700 hover:to-blue-600 transition shadow-md hover:shadow-lg"
                  aria-label="Create new job"
                >
                  New job
                </button>
              )}
              <button
                className="p-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-gray-600"
                onClick={refresh}
                disabled={loading}
                aria-label="Refresh dashboard now"
              >
                <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
              </button>
            </div>
          </div>
          {lastUpdated && (
            <p className="text-xs text-gray-600 mt-2">
              Last updated {lastUpdated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </p>
          )}
        </div>
      </div>

      {/* ── Error banner ───────────────────────────────────────────────── */}
      {error && (
        <div className="mx-auto max-w-7xl px-4 py-3 mt-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2" role="alert">
          <AlertTriangle size={18} className="text-red-600 flex-shrink-0" />
          <p className="text-sm text-red-700 font-medium">{error}</p>
          <button className="ml-auto text-sm text-red-600 font-bold hover:text-red-700" onClick={refresh}>
            Retry
          </button>
        </div>
      )}

      {/* ── Main Content ───────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* ── Metric cards ───────────────────────────────────────────────── */}
        <section className="mb-8" aria-label="Key marketplace metrics">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {loading && !metrics ? (
              <>
                <MetricPanelSkeleton />
                <MetricPanelSkeleton />
                <MetricPanelSkeleton />
                <MetricPanelSkeleton />
              </>
            ) : metrics ? (
              <>
                <MetricCard
                  icon={<ShieldCheck size={24} />}
                  label="Total Escrow Volume"
                  value={formatXLM(metrics.totalEscrowVolume)}
                  subtext="Total XLM locked in escrow"
                  variant="accent"
                />
                <MetricCard
                  icon={<Hammer size={24} />}
                  label="Active Jobs"
                  value={metrics.activeJobsCount}
                  subtext="In progress"
                  variant="default"
                />
                <MetricCard
                  icon={<CheckSquare size={24} />}
                  label="Completed Today"
                  value={metrics.completedToday}
                  subtext={`${metrics.completionRate}% rate`}
                  variant="default"
                />
                <MetricCard
                  icon={<AlertTriangle size={24} />}
                  label="Dispute Rate"
                  value={`${metrics.disputeRate}%`}
                  subtext="48h resolution"
                  variant={
                    metrics.disputeRate > 20
                      ? "danger"
                      : metrics.disputeRate > 10
                      ? "warn"
                      : "default"
                  }
                />
              </>
            ) : null}
          </div>
        </section>

        {/* ── Charts ─────────────────────────────────────────────────────── */}
        <section className="mb-8" aria-label="Marketplace analytics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-md transition">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Activity size={18} className="text-blue-600" />
                </div>
                <h2 className="font-bold text-gray-900">Jobs by status</h2>
              </div>
              {loading && !metrics ? (
                <div className="h-64 bg-gray-100 rounded animate-pulse" />
              ) : metrics ? (
                <JobsByStatusChart data={metrics.jobsByStatus} />
              ) : null}
            </div>

            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-md transition">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <TrendingUp size={18} className="text-blue-600" />
                </div>
                <h2 className="font-bold text-gray-900">Completion rate (7 days)</h2>
              </div>
              {loading && !metrics ? (
                <div className="h-64 bg-gray-100 rounded animate-pulse" />
              ) : metrics ? (
                <CompletionTrendChart data={metrics.completionTrend} />
              ) : null}
            </div>

            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-md transition lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <BarChart3 size={18} className="text-blue-600" />
                </div>
                <h2 className="font-bold text-gray-900">Artisan earnings by trade (XLM)</h2>
              </div>
              {loading && !metrics ? (
                <div className="h-64 bg-gray-100 rounded animate-pulse" />
              ) : metrics ? (
                <ArtisanEarningsChart data={metrics.artisanEarnings} />
              ) : null}
            </div>
          </div>
        </section>

        {/* ── Recent Activity ─────────────────────────────────────────────── */}
        <section aria-label="Recent job activity">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-200">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock size={18} className="text-blue-600" />
              </div>
              <h2 className="font-bold text-gray-900">Recent state changes</h2>
              <p className="ml-auto text-sm text-gray-600">Last 5 escrow transitions</p>
            </div>
            <ActivityFeed
              events={metrics?.recentActivity ?? []}
              loading={loading && !metrics}
            />
          </div>
        </section>
      </div>
    </div>
  );
};
