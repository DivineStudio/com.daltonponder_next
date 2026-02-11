import { render, screen } from '@testing-library/react';
import { BentoGrid, BentoCard } from './BentoGrid';
import { describe, it, expect, vi } from 'vitest';

// Mock motion to avoid issues with animations in JSDOM
vi.mock('motion/react', () => ({
  motion: {
    div: ({
      children,
      whileInView,
      initial,
      viewport,
      transition,
      ...props
    }: any) => <div {...props}>{children}</div>,
  },
}));

describe('BentoGrid', () => {
  it('renders children correctly', () => {
    render(
      <BentoGrid>
        <div data-testid="child">Test Child</div>
      </BentoGrid>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('applies default classes', () => {
    const { container } = render(<BentoGrid>Children</BentoGrid>);
    const grid = container.firstChild as HTMLElement;
    expect(grid).toHaveClass('grid');
    expect(grid).toHaveClass('grid-cols-1');
    expect(grid).toHaveClass('md:grid-cols-2');
    expect(grid).toHaveClass('lg:grid-cols-4');
    expect(grid).toHaveClass('gap-4'); // default gap md
  });

  it('applies custom column classes', () => {
    const { container } = render(<BentoGrid columns={3}>Children</BentoGrid>);
    const grid = container.firstChild as HTMLElement;
    expect(grid).toHaveClass('grid-cols-1');
    expect(grid).toHaveClass('md:grid-cols-2');
    expect(grid).toHaveClass('lg:grid-cols-3');
  });

  it('applies custom gap classes', () => {
    const { container } = render(<BentoGrid gap="lg">Children</BentoGrid>);
    const grid = container.firstChild as HTMLElement;
    expect(grid).toHaveClass('gap-6');
  });

  it('applies custom className', () => {
    const { container } = render(<BentoGrid className="custom-class">Children</BentoGrid>);
    const grid = container.firstChild as HTMLElement;
    expect(grid).toHaveClass('custom-class');
  });
});

describe('BentoCard', () => {
  it('renders children correctly', () => {
    render(
      <BentoCard>
        <div data-testid="card-child">Card Child</div>
      </BentoCard>
    );
    expect(screen.getByTestId('card-child')).toBeInTheDocument();
  });

  it('applies default classes', () => {
    const { container } = render(<BentoCard>Children</BentoCard>);
    // BentoCard with animation has a motion.div wrapper and an inner div
    const wrapper = container.firstChild as HTMLElement;
    const inner = wrapper.firstChild as HTMLElement;

    expect(wrapper).toHaveClass('col-span-1');
    expect(wrapper).toHaveClass('row-span-1');
    expect(inner).toHaveClass('bento-card');
  });

  it('applies custom colSpan and rowSpan', () => {
    const { container } = render(
      <BentoCard colSpan={2} rowSpan={2}>
        Children
      </BentoCard>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('col-span-1');
    expect(wrapper).toHaveClass('md:col-span-2');
    expect(wrapper).toHaveClass('row-span-1');
    expect(wrapper).toHaveClass('md:row-span-2');
  });

  it('applies different variants', () => {
    const { container: secondary } = render(<BentoCard variant="secondary">Children</BentoCard>);
    expect(secondary.querySelector('.bg-secondary')).toBeInTheDocument();

    const { container: accent } = render(<BentoCard variant="accent">Children</BentoCard>);
    expect(accent.querySelector('.bg-accent')).toBeInTheDocument();
  });

  it('renders without animation when animate={false}', () => {
    const { container } = render(<BentoCard animate={false}>Children</BentoCard>);
    const card = container.firstChild as HTMLElement;
    // When animate is false, it's just one div
    expect(card).toHaveClass('bento-card');
    expect(card).toHaveClass('col-span-1');
    expect(card.firstChild?.nodeName).not.toBe('DIV'); // No inner div wrapper for content usually, but wait
  });

  it('handles order classes correctly', () => {
    const { container } = render(
      <BentoCard className="order-first custom-class">
        Children
      </BentoCard>
    );
    const wrapper = container.firstChild as HTMLElement;
    const inner = wrapper.firstChild as HTMLElement;

    expect(wrapper).toHaveClass('order-first');
    expect(inner).toHaveClass('custom-class');
    expect(inner).not.toHaveClass('order-first');
  });
});
