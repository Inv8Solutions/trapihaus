"use client";
import Image, { ImageProps } from 'next/image';
import React from 'react';

/**
 * Thin wrapper around next/image so we can more easily migrate <img> tags.
 * Accepts either explicit width/height or fill. Defaults to priority false and
 * uses responsive sizes.
 */
export interface AppImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  src: string;
  alt: string;
  /** Provide numeric width to opt into static layout. */
  width?: number;
  /** Provide numeric height to opt into static layout. */
  height?: number;
  /** If true, will use fill layout (parent must be relative & sized). */
  fillParent?: boolean;
  className?: string;
}

export const AppImage: React.FC<AppImageProps> = ({
  src,
  alt,
  width,
  height,
  fillParent,
  className = '',
  ...rest
}) => {
  if (fillParent) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={className}
        sizes="(max-width:768px) 100vw, 50vw"
        {...rest}
      />
    );
  }
  // Fallback dimensions if not provided to satisfy next/image requirement
  const finalWidth = width ?? 800;
  const finalHeight = height ?? 600;
  return (
    <Image
      src={src}
      alt={alt}
      width={finalWidth}
      height={finalHeight}
      className={className}
      sizes="(max-width:768px) 100vw, 33vw"
      {...rest}
    />
  );
};

export default AppImage;
