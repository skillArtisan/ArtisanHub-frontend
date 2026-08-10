import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  MessageSquare,
  Star,
  Eye
} from 'lucide-react';

export interface Booking {
  id: string;
  artisanName: string;
  artisanId: string;
  service: string;
  date: string;
  time: string;
  location: string;
  amount: number;
  status: 'completed' | 'pending' | 'cancelled' | 'in-progress';
  rating?: number;
  review?: string;
}

interface BookingHistoryProps {
  bookings: Booking[];
  onViewDetails: (booking: Booking) => void;
  onRebook?: (booking: Booking) => void;
  onLeaveReview?: (booking: Booking) => void;
  onShareArtisan?: (artisanId: string) => void;
}

const STATUS_CONFIG = {
  completed: {
    icon: CheckCircle2,
    label: 'Completed',
    className: 'status-completed',
    color: '#10b981'
  },
  pending: {
    icon: Clock,
    label: 'Pending',
    className: 'status-pending',
    color: '#f59e0b'
  },
  'in-progress': {
    icon: RefreshCw,
    label: 'In Progress',
    className: 'status-in-progress',
    color: '#3b82f6'
  },
  cancelled: {
    icon: AlertCircle,
    label: 'Cancelled',
    className: 'status-cancelled',
    color: '#ef4444'
  }
};

export const BookingHistory: React.FC<BookingHistoryProps> = ({
  bookings,
  onViewDetails,
  onRebook,
  onLeaveReview,
  onShareArtisan
}) => {
  const [expandedBookingId, setExpandedBookingId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredBookings = filterStatus === 'all'
    ? bookings
    : bookings.filter(b => b.status === filterStatus);

  const groupedByStatus = {
    completed: bookings.filter(b => b.status === 'completed').length,
    pending: bookings.filter(b => b.status === 'pending').length,
    'in-progress': bookings.filter(b => b.status === 'in-progress').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const isExpanded = (bookingId: string) => expandedBookingId === bookingId;

  const toggleExpand = (bookingId: string) => {
    setExpandedBookingId(isExpanded(bookingId) ? null : bookingId);
  };

  return (
    <div className="booking-history-container">
      {/* Summary Cards */}
      <div className="booking-summary-grid">
        <div className="summary-card">
          <span className="summary-label">Completed</span>
          <span className="summary-count">{groupedByStatus.completed}</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">Pending</span>
          <span className="summary-count">{groupedByStatus.pending}</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">In Progress</span>
          <span className="summary-count">{groupedByStatus['in-progress']}</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">Cancelled</span>
          <span className="summary-count">{groupedByStatus.cancelled}</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="booking-filters">
        <button
          className={`filter-tab ${filterStatus === 'all' ? 'active' : ''}`}
          onClick={() => setFilterStatus('all')}
        >
          All ({bookings.length})
        </button>
        <button
          className={`filter-tab ${filterStatus === 'completed' ? 'active' : ''}`}
          onClick={() => setFilterStatus('completed')}
        >
          Completed
        </button>
        <button
          className={`filter-tab ${filterStatus === 'pending' ? 'active' : ''}`}
          onClick={() => setFilterStatus('pending')}
        >
          Pending
        </button>
        <button
          className={`filter-tab ${filterStatus === 'in-progress' ? 'active' : ''}`}
          onClick={() => setFilterStatus('in-progress')}
        >
          In Progress
        </button>
        <button
          className={`filter-tab ${filterStatus === 'cancelled' ? 'active' : ''}`}
          onClick={() => setFilterStatus('cancelled')}
        >
          Cancelled
        </button>
      </div>

      {/* Booking List */}
      <div className="booking-list">
        {filteredBookings.length === 0 ? (
          <div className="empty-state">
            <Calendar size={40} />
            <h3>No bookings yet</h3>
            <p>When you book an artisan, your bookings will appear here</p>
          </div>
        ) : (
          filteredBookings.map((booking) => {
            const isExp = isExpanded(booking.id);
            const statusConfig = STATUS_CONFIG[booking.status as keyof typeof STATUS_CONFIG];
            const StatusIcon = statusConfig.icon;

            return (
              <div
                key={booking.id}
                className={`booking-item ${isExp ? 'expanded' : ''}`}
              >
                <div
                  className="booking-item-header"
                  onClick={() => toggleExpand(booking.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      toggleExpand(booking.id);
                    }
                  }}
                  aria-expanded={isExp}
                >
                  <div className="booking-item-main">
                    <div className="booking-status">
                      <StatusIcon size={20} color={statusConfig.color} />
                      <span className={statusConfig.className}>
                        {statusConfig.label}
                      </span>
                    </div>

                    <div className="booking-summary">
                      <h4>{booking.artisanName}</h4>
                      <p className="booking-service">{booking.service}</p>
                      <div className="booking-quick-info">
                        <span className="info-item">
                          <Calendar size={14} />
                          {formatDate(booking.date)}
                        </span>
                        <span className="info-item">
                          <Clock size={14} />
                          {booking.time}
                        </span>
                        <span className="info-item">
                          <DollarSign size={14} />
                          {formatCurrency(booking.amount)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="booking-expand-icon">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.5 7.5L10 10L12.5 7.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExp && (
                  <div className="booking-item-details">
                    <div className="booking-detail-section">
                      <h5>Booking Details</h5>
                      <div className="booking-details-grid">
                        <div className="detail-item">
                          <label>Location</label>
                          <div className="detail-value">
                            <MapPin size={14} />
                            <span>{booking.location}</span>
                          </div>
                        </div>
                        <div className="detail-item">
                          <label>Booking ID</label>
                          <div className="detail-value">
                            <code>{booking.id}</code>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Review Section (for completed bookings) */}
                    {booking.status === 'completed' && (
                      <div className="booking-detail-section">
                        <h5>Rating & Review</h5>
                        {booking.rating ? (
                          <div className="booking-review">
                            <div className="review-rating">
                              <div className="stars">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    size={16}
                                    fill={i < booking.rating! ? '#fbbf24' : '#e5e7eb'}
                                    color={i < booking.rating! ? '#f59e0b' : '#d1d5db'}
                                  />
                                ))}
                              </div>
                              <span>{booking.rating.toFixed(1)} / 5</span>
                            </div>
                            {booking.review && (
                              <p className="review-text">"{booking.review}"</p>
                            )}
                          </div>
                        ) : (
                          <p className="no-review">No review yet</p>
                        )}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="booking-item-actions">
                      <button
                        onClick={() => onViewDetails(booking)}
                        className="secondary-action"
                      >
                        <Eye size={14} />
                        View Details
                      </button>

                      {booking.status === 'completed' && !booking.rating && onLeaveReview && (
                        <button
                          onClick={() => onLeaveReview(booking)}
                          className="primary-action"
                        >
                          <Star size={14} />
                          Leave Review
                        </button>
                      )}

                      {(booking.status === 'completed' || booking.status === 'cancelled') && onRebook && (
                        <button
                          onClick={() => onRebook(booking)}
                          className="secondary-action"
                        >
                          <RefreshCw size={14} />
                          Rebook
                        </button>
                      )}

                      {onShareArtisan && (
                        <button
                          onClick={() => onShareArtisan(booking.artisanId)}
                          className="ghost-action"
                          aria-label="Share artisan"
                        >
                          <MessageSquare size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default BookingHistory;
