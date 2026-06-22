import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('portfolio content', () => {
  it('renders Rohan Rampersad with honest graduate positioning and required CTAs', () => {
    render(<App />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /building digital systems with code, data, and practical ai/i
    );
    expect(screen.getAllByText(/Rohan Rampersad/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/recent BSc \(Hons\) Applied Computer Science graduate/i).length).toBeGreaterThan(0);
    expect(screen.getByRole('link', { name: /view projects/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contact me/i })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /download resume/i }).length).toBeGreaterThan(0);
  });

  it('includes the three real projects and leaves room for future work', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /cash compass/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /matchiq/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /fitness central/i })).toBeInTheDocument();
    expect(screen.getByText(/future projects/i)).toBeInTheDocument();
  });

  it('does not render stale student or fake-claim wording', () => {
    const { container } = render(<App />);
    const pageText = container.textContent.toLowerCase();

    expect(pageText).not.toMatch(/awaiting results/);
    expect(pageText).not.toMatch(/awaiting final results/);
    expect(pageText).not.toMatch(/current student/);
    expect(pageText).not.toMatch(/final-year student/);
    expect(pageText).not.toMatch(/still studying/);
    expect(pageText).not.toMatch(/ai job match assistant/);
    expect(pageText).not.toMatch(/client satisfaction/);
    expect(pageText).not.toMatch(/trusted by/);
    expect(pageText).not.toMatch(/senior developer/);
  });

  it('renders the confirmed contact hub details and destinations', () => {
    render(<App />);

    const contact = screen.getByRole('region', { name: /let's build something useful/i });
    const contactQueries = within(contact);

    expect(contact.querySelector('.contact-lightfall')).toBeInTheDocument();
    expect(contactQueries.getByText('1 (868) 284-4520')).toBeInTheDocument();
    expect(contactQueries.getByText('Trinidad & Tobago')).toBeInTheDocument();
    expect(contactQueries.getByRole('link', { name: /email rohan/i })).toHaveAttribute(
      'href',
      'mailto:rohanrampersad383@gmail.com'
    );
    expect(contactQueries.getByRole('link', { name: /call rohan/i })).toHaveAttribute('href', 'tel:+18682844520');
    expect(contactQueries.getByRole('link', { name: /view portfolio/i })).toHaveAttribute(
      'href',
      'https://rohanrampersad.vercel.app'
    );
    expect(contactQueries.getByRole('link', { name: /linkedin profile/i })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/rohan-rampersad-a18ab1401/'
    );
  });

  it('uses specific early-career capability wording in the value cards', () => {
    render(<App />);

    expect(screen.getByText(/responsive interfaces and database-backed workflows/i)).toBeInTheDocument();
    expect(screen.getByText(/dashboards, reports, and structured data models/i)).toBeInTheDocument();
    expect(screen.getByText(/troubleshooting, user support, and clear handover notes/i)).toBeInTheDocument();
    expect(screen.getByText(/coursework and prototypes for practical automation/i)).toBeInTheDocument();
    expect(screen.getByText(/system analysis, 3nf design, and technical documentation/i)).toBeInTheDocument();
  });
});
