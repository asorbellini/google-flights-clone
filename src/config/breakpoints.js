// Configuración de breakpoints 
export const BREAKPOINTS = {
    xs: 0,      
    sm: 600,    // Small devices 
    md: 900,    // Medium devices (tablets)
    lg: 1200,   // Large devices (desktops)
    xl: 1536,   // Extra large devices
};

// Tamaño de pantalla
export const isMobile = (width) => width < BREAKPOINTS.sm;
export const isTablet = (width) => width >= BREAKPOINTS.sm && width < BREAKPOINTS.md;
export const isDesktop = (width) => width >= BREAKPOINTS.md;

// Espaciado responsivo
export const SPACING = {
    xs: { xs: 1, sm: 2, md: 3, lg: 4 },
    sm: { xs: 2, sm: 3, md: 4, lg: 5 },
    md: { xs: 3, sm: 4, md: 5, lg: 6 },
    lg: { xs: 4, sm: 5, md: 6, lg: 8 },
};

// Configuración de tipografía responsiva
export const TYPOGRAPHY = {
    h1: { xs: 'h3', sm: 'h2', md: 'h1' },
    h2: { xs: 'h4', sm: 'h3', md: 'h2' },
    h3: { xs: 'h5', sm: 'h4', md: 'h3' },
    h4: { xs: 'h6', sm: 'h5', md: 'h4' },
    h5: { xs: 'body1', sm: 'h6', md: 'h5' },
    h6: { xs: 'body2', sm: 'body1', md: 'h6' },
    body1: { xs: 'body2', sm: 'body1', md: 'body1' },
    body2: { xs: 'caption', sm: 'body2', md: 'body2' },
};

// Grid responsivo
export const GRID = {
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
};

export const getResponsiveValue = (values, breakpoint) => {
    if (typeof values === 'object') {
        return values[breakpoint] || values.xs || values;
    }
    return values;
};

export const createResponsiveStyles = (styles) => {
    return {
        xs: styles.xs || styles,
        sm: styles.sm || styles.xs || styles,
        md: styles.md || styles.sm || styles.xs || styles,
        lg: styles.lg || styles.md || styles.sm || styles.xs || styles,
    };
};
