import type { ReactNode } from "react";

// Minimal motion/AnimatePresence shim so we don't need framer-motion.

type AnyProps = { [key: string]: any };

type MotionComponent = (props: AnyProps) => JSX.Element;

const createMotion = (Tag: keyof JSX.IntrinsicElements): MotionComponent => {
  return (props: AnyProps) => {
    const { children, ...rest } = props;
    return <Tag {...(rest as any)}>{children}</Tag>;
  };
};

// Use loose "any" typing so JSX accepts motion.div/motion.h1/etc.
export const motion: any = {
  div: createMotion("div"),
  span: createMotion("span"),
  button: createMotion("button"),
  h1: createMotion("h1"),
  h2: createMotion("h2"),
};

export function AnimatePresence({
  children,
}: {
  children?: ReactNode;
  mode?: string;
}) {
  return <>{children}</>;
}
