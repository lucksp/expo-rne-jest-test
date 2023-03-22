import { makeStyles } from '@rneui/themed';
import { Platform } from 'react-native';

export const useAuthStyles = makeStyles(theme => ({
  headerStyles: {
    backgroundColor: theme.colors?.backgroundColor,
    shadowColor: theme.colors?.backgroundColor,
    elevation: 0,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: Platform.OS === 'ios' ? 0 : -44,
  },
  headerTitle: {
    color: theme.colors?.black,
  },
}));
