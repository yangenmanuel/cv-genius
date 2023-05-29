import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

export default function Cv ({ email, phone, linkedIn, github, user, role, profile, languages, workExperiences, abilities }) {
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
    },
    languagesContainer: {
      display: 'flex'
    }
  })
  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.infoText}>{email}   {phone}   {linkedIn}   {github}</Text>
        <Text style={styles.title}>{user}</Text>
        <Text style={styles.role}>{role}</Text>
        <Text style={styles.profile}>{profile}</Text>
        {typeof workExperiences === 'object' && workExperiences.length !== 0
          ? (
            <View>
              <Text>Experiencia Laboral</Text>
              {workExperiences && workExperiences.map((work, i) => {
                return (
                  <View key={i}>
                    <Text>{work.company} {work.from} {work.to}</Text>
                    <Text>{work.role}</Text>
                    <Text>{work.description}</Text>
                  </View>
                )
              })}
            </View>
            )
          : null}
        
        {typeof abilities === 'object' && abilities.length !== 0
          ? (
            <View>
              <Text style={{ }}>Habilidades</Text>
              {abilities && abilities.map((ability, i) => {
                return <Text key={i}>• {ability}</Text>
              })}
            </View>
            )
          : null}

        {typeof languages === 'object' && languages.length !== 0
          ? (
            <View>
              <Text style={{ }}>Idiomas</Text>
              {languages && languages.map((lang, i) => {
                return <Text key={i}>• {lang}</Text>
              })}
            </View>
            )
          : null}
      </Page>
    </Document>
  )
}
