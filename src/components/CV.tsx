import { Document, Page, Text, StyleSheet } from '@react-pdf/renderer'

export default function Cv ({ email, phone, linkedIn, github, name, profile, role }) {
  const styles = StyleSheet.create({
    body: {
      paddingTop: 25,
      paddingBottom: 30,
      paddingHorizontal: 30
    },
    title: {
      fontSize: 28,
      marginTop: 30
    },
    subtitle: {
      fontSize: 18,
      margin: 12,
      fontFamily: 'Oswald'
    },
    infoText: {
      fontSize: 9,
      textAlign: 'center'
    },
    role: {
      fontSize: 20,
      marginTop: 12
    },
    profile: {
      marginTop: 5,
      fontSize: 14
    }
  })
  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.infoText}>{email}   {phone}   {linkedIn}   {github}</Text>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.role}>{role}</Text>
        <Text style={styles.profile}>{profile}</Text>
      </Page>
    </Document>
  )
}
