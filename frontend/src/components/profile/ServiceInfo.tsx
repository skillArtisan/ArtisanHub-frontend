import React from 'react';
import {
  Clock,
  Calendar,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Phone
} from 'lucide-react';
import { Artisan, BusinessHours } from '../../data/mockArtisanData';

interface ServiceInfoProps {
  artisan: Artisan;
}

export const ServiceInfo: React.FC<ServiceInfoProps> = ({ artisan }) => {
  const DAYS_ORDER = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  const getDayLabel = (day: string) => {
    return day.charAt(0).toUpperCase() + day.slice(1);
  };

  const isOpen = (hours: any) => {
    if (!hours) return false;
    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    return currentTime >= hours.startTime && currentTime <= hours.endTime;
  };

  const getUpcomingAvailableDate = () => {
    if (artisan.availabilityCalendar.length === 0) return null;
    const dates = artisan.availabilityCalendar.map(d => new Date(d)).sort((a, b) => a.getTime() - b.getTime());
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const upcoming = dates.find(d => d >= today);
    return upcoming || dates[0];
  };

  return (
    <div className="service-info-container">
      {/* Service Categories */}
      {artisan.serviceCategories && artisan.serviceCategories.length > 0 && (
        <section className="service-section">
          <h3>Services Offered</h3>
          <div className="services-grid">
            {artisan.serviceCategories.map((service) => (
              <div key={service.id} className="service-card">
                <div className="service-header">
                  <h4>{service.name}</h4>
                  {service.basePrice && (
                    <span className="service-price">
                      From ${service.basePrice}
                    </span>
                  )}
                </div>
                {service.description && (
                  <p className="service-description">{service.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Business Hours */}
      <section className="service-section">
        <h3>Business Hours</h3>
        <div className="business-hours-display">
          {DAYS_ORDER.map((day) => {
            const dayKey = day as keyof typeof artisan.businessHours;
            const hours = artisan.businessHours[dayKey];
            const open = hours ? isOpen(hours) : false;

            return (
              <div key={day} className="business-hours-row">
                <span className="day-label">{getDayLabel(day)}</span>
                <div className="day-hours">
                  {hours ? (
                    <>
                      <span className="hours-time">
                        {hours.startTime} – {hours.endTime}
                      </span>
                      {open && (
                        <span className="status-badge open">
                          <CheckCircle2 size={12} />
                          Open now
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="hours-closed">Closed</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Availability Calendar */}
      {artisan.availabilityCalendar && artisan.availabilityCalendar.length > 0 && (
        <section className="service-section">
          <h3>Available Dates</h3>
          <div className="availability-info">
            {getUpcomingAvailableDate() && (
              <div className="next-available">
                <Calendar size={16} />
                <div>
                  <span className="availability-label">Next Available:</span>
                  <span className="availability-date">
                    {getUpcomingAvailableDate()?.toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            )}

            <div className="available-dates-grid">
              {artisan.availabilityCalendar
                .slice(0, 8)
                .map((date) => {
                  const dateObj = new Date(date);
                  const isToday = dateObj.toDateString() === new Date().toDateString();
                  const tomorrow = new Date();
                  tomorrow.setDate(tomorrow.getDate() + 1);
                  const isTomorrow = dateObj.toDateString() === tomorrow.toDateString();

                  return (
                    <div
                      key={date}
                      className={`available-date-chip ${isToday ? 'today' : ''} ${isTomorrow ? 'tomorrow' : ''}`}
                    >
                      <span className="chip-day">
                        {dateObj.toLocaleDateString('en-US', { weekday: 'short' })}
                      </span>
                      <span className="chip-date">{dateObj.getDate()}</span>
                      {isToday && <span className="chip-label">Today</span>}
                      {isTomorrow && <span className="chip-label">Tomorrow</span>}
                    </div>
                  );
                })}
              {artisan.availabilityCalendar.length > 8 && (
                <div className="available-date-chip more">
                  <span className="chip-more">
                    +{artisan.availabilityCalendar.length - 8} more
                  </span>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="service-section">
        <h3>Get in Touch</h3>
        <div className="contact-actions">
          <button className="contact-button">
            <Phone size={16} />
            <span>Call</span>
          </button>
          <button className="contact-button">
            <AlertCircle size={16} />
            <span>Message</span>
          </button>
          <button className="contact-button">
            <MapPin size={16} />
            <span>Get Directions</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default ServiceInfo;
