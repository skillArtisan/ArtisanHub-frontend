import React, { useState } from 'react';
import {
  Share2,
  Copy,
  Mail,
  MessageCircle,
  Facebook,
  Linkedin,
  Twitter,
  Link as LinkIcon,
  CheckCircle2,
  X
} from 'lucide-react';
import { Artisan } from '../../data/mockArtisanData';

interface ShareArtisanProps {
  artisan: Artisan;
  onClose: () => void;
}

export const ShareArtisan: React.FC<ShareArtisanProps> = ({ artisan, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const shareUrl = `${window.location.origin}/artisan/${artisan.id}`;
  const shareText = `Check out ${artisan.name}, a verified ${artisan.specializations.join('/')} specialist on ArtisanHub. Rating: ${artisan.averageRating}★`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEmailShare = () => {
    const subject = `Check out ${artisan.name} on ArtisanHub`;
    const body = `${shareText}\n\nProfile: ${shareUrl}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleWhatsAppShare = () => {
    const message = `${shareText}\n${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleFacebookShare = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      '_blank'
    );
  };

  const handleLinkedInShare = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      '_blank'
    );
  };

  const handleTwitterShare = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
      '_blank'
    );
  };

  const shareOptions = [
    {
      id: 'copy-link',
      label: 'Copy Link',
      icon: Copy,
      action: handleCopyLink,
      highlight: copied
    },
    {
      id: 'email',
      label: 'Email',
      icon: Mail,
      action: handleEmailShare
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      icon: MessageCircle,
      action: handleWhatsAppShare
    },
    {
      id: 'facebook',
      label: 'Facebook',
      icon: Facebook,
      action: handleFacebookShare
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      icon: Linkedin,
      action: handleLinkedInShare
    },
    {
      id: 'twitter',
      label: 'Twitter',
      icon: Twitter,
      action: handleTwitterShare
    }
  ];

  return (
    <div className="share-artisan-modal">
      <div className="modal-overlay" onClick={onClose} />

      <div className="modal-content share-modal">
        <div className="modal-header">
          <h2>Share {artisan.name}</h2>
          <button
            onClick={onClose}
            className="ghost-action"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {/* Share Link Preview */}
          <div className="share-link-preview">
            <div className="link-icon">
              <LinkIcon size={20} />
            </div>
            <div className="link-content">
              <p className="link-label">Artisan Profile Link</p>
              <p className="link-text">{shareUrl}</p>
            </div>
          </div>

          {/* Share Options Grid */}
          <div className="share-options-grid">
            {shareOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.id}
                  onClick={() => {
                    option.action();
                    setSelectedMethod(option.id);
                  }}
                  className={`share-option-button ${
                    selectedMethod === option.id ? 'selected' : ''
                  } ${option.highlight ? 'copied' : ''}`}
                  aria-label={`Share via ${option.label}`}
                >
                  {option.highlight ? (
                    <>
                      <CheckCircle2 size={24} />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Icon size={24} />
                      <span>{option.label}</span>
                    </>
                  )}
                </button>
              );
            })}
          </div>

          {/* Share Message */}
          <div className="share-message-section">
            <label>Message Preview</label>
            <div className="share-message-box">
              <p>{shareText}</p>
            </div>
          </div>

          {/* Artisan Summary */}
          <div className="shared-artisan-summary">
            <h4>About {artisan.name}</h4>
            <div className="summary-grid">
              <div className="summary-item">
                <span className="summary-label">Rating</span>
                <span className="summary-value">
                  {artisan.averageRating.toFixed(1)} ★
                </span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Jobs Completed</span>
                <span className="summary-value">{artisan.completedJobs}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Specializations</span>
                <span className="summary-value">
                  {artisan.specializations.slice(0, 2).join(', ')}
                  {artisan.specializations.length > 2 && ' +'}
                </span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Status</span>
                <span className="summary-value">
                  {artisan.isVerified ? '✓ Verified' : 'Unverified'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="secondary-action">
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareArtisan;
