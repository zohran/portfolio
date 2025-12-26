'use client';

import { useState } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Message sent successfully! I&apos;ll get back to you soon.',
        });
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.error || 'Failed to send message. Please try again.',
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'An error occurred. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-16 xs:py-20 sm:py-24 md:py-32 bg-muted">
      <div className="container mx-auto px-2.5 xs:px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="inline-block border-2 border-foreground px-3 xs:px-4 sm:px-5 md:px-6 py-1 xs:py-1.5 sm:py-2 mb-5 xs:mb-6 sm:mb-8">
            <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-black text-foreground uppercase tracking-tight leading-tight">
              Contact
            </h2>
          </div>

          <p className="text-foreground/70 text-xs xs:text-sm sm:text-base md:text-lg leading-relaxed mb-6 xs:mb-8 sm:mb-10 md:mb-12 px-0.5">
            Feel free to reach out if you&apos;re looking for a developer, have a question, or just want to connect.
          </p>

          <form onSubmit={handleSubmit} className="space-y-3.5 xs:space-y-4 sm:space-y-5 md:space-y-6">
            <div>
              <label htmlFor="name" className="block text-[10px] xs:text-xs sm:text-sm font-medium text-foreground/70 mb-1 xs:mb-1.5 sm:mb-2 uppercase tracking-wide">
                Your name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-2.5 xs:px-3 sm:px-4 py-2 xs:py-2.5 sm:py-3 bg-background border border-border text-foreground text-xs xs:text-sm sm:text-base focus:outline-none focus:border-foreground transition-colors rounded-sm touch-manipulation"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-[10px] xs:text-xs sm:text-sm font-medium text-foreground/70 mb-1 xs:mb-1.5 sm:mb-2 uppercase tracking-wide">
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-2.5 xs:px-3 sm:px-4 py-2 xs:py-2.5 sm:py-3 bg-background border border-border text-foreground text-xs xs:text-sm sm:text-base focus:outline-none focus:border-foreground transition-colors rounded-sm touch-manipulation"
                required
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-[10px] xs:text-xs sm:text-sm font-medium text-foreground/70 mb-1 xs:mb-1.5 sm:mb-2 uppercase tracking-wide">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-2.5 xs:px-3 sm:px-4 py-2 xs:py-2.5 sm:py-3 bg-background border border-border text-foreground text-xs xs:text-sm sm:text-base focus:outline-none focus:border-foreground transition-colors rounded-sm touch-manipulation"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-[10px] xs:text-xs sm:text-sm font-medium text-foreground/70 mb-1 xs:mb-1.5 sm:mb-2 uppercase tracking-wide">
                Your message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full px-2.5 xs:px-3 sm:px-4 py-2 xs:py-2.5 sm:py-3 bg-background border border-border text-foreground text-xs xs:text-sm sm:text-base focus:outline-none focus:border-foreground transition-colors resize-none rounded-sm touch-manipulation"
                required
              />
            </div>

            {submitStatus.type && (
              <div
                className={`p-2.5 xs:p-3 sm:p-4 rounded-md xs:rounded-lg border ${
                  submitStatus.type === 'success'
                    ? 'bg-foreground/10 border-foreground/30 text-foreground'
                    : 'bg-foreground/10 border-foreground/30 text-foreground'
                }`}
              >
                <p className="text-[10px] xs:text-xs sm:text-sm leading-relaxed">{submitStatus.message}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-4 xs:px-5 sm:px-6 py-2.5 xs:py-3 sm:py-4 bg-foreground text-background text-xs xs:text-sm sm:text-base font-bold uppercase tracking-wider hover:opacity-90 active:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed rounded-sm touch-manipulation"
            >
              {isSubmitting ? 'Sending...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}



