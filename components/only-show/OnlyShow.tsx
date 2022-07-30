import React from 'react';

interface OnlyShowProps {
  if?: boolean
  children?: any
}

export default function OnlyShow(props: OnlyShowProps) {
  return (
    <>{ props.if && props.children }</>
  );
}
