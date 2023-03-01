import { extendTheme } from '@mui/joy/styles';

export const extendedTheme = extendTheme({
    fontFamily: {
        display: 'Century Gothic, var(--joy-fontFamily-fallback)',
        body: 'Century Gothic, var(--joy-fontFamily-fallback)',
    },
    colorSchemes: {
        light: {
            palette: {  
                primary: {
                    solidHoverBg: "#0E5E6F",
                    solidBg: "#3A8891",
                    plainColor: "#3A8891",
                    plainHoverBg: "#0E5E6F20",
                    outlinedBorder: "#3A8891",
                    outlinedColor: "#3A8891",
                    outlinedActiveBg: "#0E5E6F20",
                },
                danger: {
                    solidBg: "#B73E3E",
                },
                success: {
                    solidBg: "#3FA796",
                },
                info: {
                    
                }
            },

        },
    },
    components: {
        JoyButton: {
            styleOverrides:{
                root: ({ theme }) => ({
                    borderRadius: "2px",
                }),
            }
        },
        JoyTypography: {
            styleOverrides: {
                root: ({ theme }) => ({
                    color: "#393E46",
                }),
            }
        }
    },
});