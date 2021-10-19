import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
  img: {
    position: 'absolute',
    top: -15,
    width: 150
  },
  title: {
    position: 'absolute',
    right: 0,
    top: 5,
    fontSize: 14,
  },
  body: {
    position: 'relative',
    top: 30,
  },
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4'
  },
  pageHeader: {
    marginBottom: 0,
    fontSize: 24,
  },
  sectionHeader: {
    marginTop: 10,
    width: '100%',
    marginBottom: 10,
    fontSize: 12,
    borderBottomColor: 'black',
    borderBottomStyle: 'solid',
    borderBottom: 1,
  },
  col2Key: {
    position: 'absolute',
    left: '273px',
  },
  col2Data: {
    position: 'absolute',
    left: '370px',
  },
  col1: {
    position: 'absolute',
    left: '120px',
  },
  dl: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: 10,
  },
  dd: {
    display: 'flex',
    flexGrow: 1,
    fontSize: 10,
    fontWeight: 500
  },
  dt: {
    flexDirection: 'row',
    color: '#274C7E',
  },
  createdAtTag: {
    position: 'absolute',
    fontSize: 10,
    right: 40,
    bottom: 20,
  },
  section: {
    justifyContent: 'space-evenly',
    margin: 10,
    padding: 10,
    flexGrow: 0,
    fontSize: 10,
    lineHeight: 1.3,
  },
});
