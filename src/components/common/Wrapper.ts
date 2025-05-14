import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

/*Flex*/
const BasicFlex = cva('flex', {
  variants: {
    direction: {
      row: 'flex-row',
      rowReverse: 'flex-row-reverse',
      column: 'flex-col',
      colReverse: 'flex-col-reverse',
    },
    justify: {
      center: 'justify-center',
      between: 'justify-between',
      around: 'justify-around',
      start: 'justify-start',
      end: 'justify-end',
    },
    align: {
      center: 'items-center',
      start: 'items-start',
      end: 'items-end',
    },
    wrap: {
      wrap: 'flex-wrap',
      nowrap: 'flex-nowrap',
    },
  },
  defaultVariants: {
    direction: 'row',
    justify: 'center',
    align: 'center',
    wrap: 'nowrap',
  },
});

type BasicFlexOptions = VariantProps<typeof BasicFlex>;

interface FlexOptions extends BasicFlexOptions {
  width?: string;
  height?: string;
  gap?: string;
  padding?: {
    x?: string;
    y?: string;
  };
  margin?: string;
}

export const Flex = (options: FlexOptions) => {
  const { width, height, gap, padding, margin, ...rest } = options;
  return clsx(
    BasicFlex(rest),
    width && width,
    height && height,
    gap && gap,
    padding?.x && padding.x,
    padding?.y && padding.y,
    margin && margin,
  );
};

/*Position*/
const BasicPosition = cva('position', {
  variants: {
    position: {
      static: 'static',
      fixed: 'fixed',
      absolute: 'absolute',
      relative: 'relative',
      sticky: 'sticky',
    },
  },
  defaultVariants: {
    position: 'static',
  },
});

type BasicPositionOptions = VariantProps<typeof BasicPosition>;

interface PositionOptions extends BasicPositionOptions {
  top?: string;
  right?: string;
  left?: string;
  bottom?: string;
  zIndex?: string;
}

export const Position = (options: PositionOptions) => {
  const { top, right, left, bottom, zIndex, ...rest } = options;
  return clsx(
    BasicPosition(rest),
    top && top,
    right && right,
    left && left,
    bottom && bottom,
    zIndex && zIndex,
  );
};
