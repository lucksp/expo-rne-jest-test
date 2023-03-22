import { makeStyles } from '@rneui/themed';

export const useInspectionStyles = makeStyles(theme => ({
  headerStyles: {
    backgroundColor: theme.colors?.backgroundColor,
    shadowColor: theme.colors?.backgroundColor,
    elevation: 0,
  },
}));
