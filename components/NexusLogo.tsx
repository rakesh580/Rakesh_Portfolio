
import React from 'react';

/**
 * Custom brand mark for NexusAgent, a stylised terminal prompt (">_").
 *
 * Variants:
 *  - `idle`     : static chevron + slowly-breathing pulse ring (resting state)
 *  - `thinking` : chevron shifts slightly as concentric rings ripple (loading)
 *  - `active`   : solid/vivid (used in match-mode and when chat is open)
 *
 * The whole thing is pure SVG + CSS, inherits currentColor, and scales with
 * its container. No PNG, no icon-font dependency, no Material Symbols emoji.
 */
type Variant = 'idle' | 'thinking' | 'active';

interface NexusLogoProps {
  variant?: Variant;
  size?: number;                 // px, defaults to inherit from parent
  className?: string;
  withPulseRing?: boolean;       // outer animated ring, default true for floating button
}

const NexusLogo: React.FC<NexusLogoProps> = ({
  variant = 'idle',
  size,
  className = '',
  withPulseRing = true,
}) => {
  const style = size ? { width: size, height: size } : undefined;
  const ringOpacity =
    variant === 'thinking' ? 'opacity-80' :
    variant === 'active'   ? 'opacity-60' :
                             'opacity-40';

  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      className={className}
      aria-hidden="true"
    >
      {/* Outer pulse rings, only drawn on the floating button */}
      {withPulseRing && (
        <g className={ringOpacity}>
          <circle
            cx="24" cy="24" r="22"
            stroke="currentColor" strokeWidth="0.75"
            className={variant === 'thinking' ? 'animate-ping [animation-duration:1.4s]' : 'animate-pulse [animation-duration:2.6s]'}
          />
          <circle
            cx="24" cy="24" r="18"
            stroke="currentColor" strokeWidth="0.5"
            opacity="0.5"
          />
        </g>
      )}

      {/* Chevron ">" */}
      <path
        d="M13 15 L22 24 L13 33"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={variant === 'thinking' ? 'animate-pulse [animation-duration:0.9s]' : ''}
      />

      {/* Cursor block "_" */}
      <rect
        x="26" y="30" width="11" height="3"
        rx="0.5"
        fill="currentColor"
        className="animate-pulse [animation-duration:1.1s]"
      />
    </svg>
  );
};

export default NexusLogo;
