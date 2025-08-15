import { useTheme, useMediaQuery } from '@mui/material';
import { useMemo } from 'react';

export const useResponsive = () => {
  const theme = useTheme();
  
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const isExtraLargeScreen = useMediaQuery(theme.breakpoints.up('xl'));

  const breakpoint = useMemo(() => {
    if (isExtraLargeScreen) return 'xl';
    if (isLargeScreen) return 'lg';
    if (isDesktop) return 'md';
    if (isTablet) return 'sm';
    return 'xs';
  }, [isMobile, isTablet, isDesktop, isLargeScreen, isExtraLargeScreen]);

  const isLandscape = useMediaQuery('(orientation: landscape)');
  const isPortrait = useMediaQuery('(orientation: portrait)');

  const spacing = useMemo(() => ({
    xs: isMobile ? 1 : isTablet ? 2 : 3,
    sm: isMobile ? 2 : isTablet ? 3 : 4,
    md: isMobile ? 3 : isTablet ? 4 : 5,
    lg: isMobile ? 4 : isTablet ? 5 : 6,
  }), [isMobile, isTablet]);

  const typography = useMemo(() => ({
    h1: isMobile ? 'h3' : isTablet ? 'h2' : 'h1',
    h2: isMobile ? 'h4' : isTablet ? 'h3' : 'h2',
    h3: isMobile ? 'h5' : isTablet ? 'h4' : 'h3',
    h4: isMobile ? 'h6' : isTablet ? 'h5' : 'h4',
    h5: isMobile ? 'body1' : isTablet ? 'h6' : 'h5',
    h6: isMobile ? 'body2' : isTablet ? 'body1' : 'h6',
    body1: isMobile ? 'body2' : 'body1',
    body2: isMobile ? 'caption' : 'body2',
  }), [isMobile, isTablet]);


  const grid = useMemo(() => ({
    form: {
      xs: 12,
      sm: 6,
      md: 4,
      lg: 3,
    },
    results: {
      xs: 12,
      sm: 12,
      md: 12,
    },
    button: {
      xs: 12,
      sm: 'auto',
      md: 'auto',
    },
  }), []);

  const getResponsiveValue = (values) => {
    if (typeof values === 'object') {
      return values[breakpoint] || values.xs || values;
    }
    return values;
  };

  const createResponsiveStyles = (styles) => {
    return {
      xs: styles.xs || styles,
      sm: styles.sm || styles.xs || styles,
      md: styles.md || styles.sm || styles.xs || styles,
      lg: styles.lg || styles.md || styles.sm || styles.xs || styles,
    };
  };

  return {
    // Breakpoints
    isMobile,
    isTablet,
    isDesktop,
    isLargeScreen,
    isExtraLargeScreen,
    breakpoint,
    
    // Orientación
    isLandscape,
    isPortrait,
    
    // Utilidades
    spacing,
    typography,
    grid,
    getResponsiveValue,
    createResponsiveStyles,
  };
};
