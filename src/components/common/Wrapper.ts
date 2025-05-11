import { cva } from 'class-variance-authority';

export const Flex = cva('flex', {
  variants: {
    direction: {
      row: 'flex-row',
      column: 'flex-col',
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
