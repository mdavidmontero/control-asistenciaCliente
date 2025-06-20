import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import logo from "/logo.png";
import { AREAS, INTERVENCIONES } from "@/data";
import type { limpiezasCleaningTypes } from "@/types/schemas";

const check = "X";

const styles = StyleSheet.create({
  page: { padding: 20, fontSize: 8 },

  headerWrapper: {
    marginBottom: 10,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logo: {
    width: 60,
    height: 60,
  },
  spacer: {
    flex: 1,
  },
  centeredInfo: {
    alignItems: "center",
    fontSize: 8,
    marginTop: -20,
  },
  headerTitle: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 2,
    textAlign: "center",
  },
  section: {
    border: "1 solid black",
    padding: 4,
    marginBottom: 6,
  },
  row: { flexDirection: "row", flexWrap: "wrap", marginBottom: 2 },
  label: { fontWeight: "bold", marginRight: 2 },
  box: {
    border: "0.5 solid #000",
    padding: 1,
    margin: 1,
    minWidth: "22%", // Más angosto
    fontSize: 6,
  },
  firma: {
    marginTop: 12,
    textAlign: "center",
    fontSize: 7,
  },
});

const formatFecha = (dateStr: string) => {
  const date = new Date(dateStr);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};
interface Props {
  data: limpiezasCleaningTypes[];
}
export const PDFCleaningBlock = ({ data }: Props) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Encabezado */}
        <View style={styles.headerWrapper}>
          <View style={styles.headerRow}>
            <Image src={logo} style={styles.logo} />
            <View style={styles.spacer} />
          </View>
          <View style={styles.centeredInfo}>
            <Text style={styles.headerTitle}>
              FORMATO DE ASEO, LIMPIEZA Y DESINFECCIÓN EN CENTRO DE ACOPIO
            </Text>
            <Text>Macroproceso: Gestión Logística</Text>
            <Text>Proceso: Servicios Generales</Text>
            <Text>Código: FO-ALDCA-02</Text>
            <Text>Versión: 002</Text>
            <Text>Fecha: 05/08/2024</Text>
          </View>
        </View>

        {/* Registros */}
        {data.map((item, idx) => (
          <View key={idx} style={styles.section}>
            <View style={styles.row}>
              <Text style={styles.label}>Fecha:</Text>
              <Text>{formatFecha(item!.date)}</Text>
              <Text style={[styles.label, { marginLeft: 10 }]}>
                Responsable:
              </Text>
              <Text>{item!.responsable}</Text>
            </View>

            <Text style={styles.label}>Áreas:</Text>
            <View style={styles.row}>
              {AREAS.map((area) => (
                <Text key={area.key} style={styles.box}>
                  [
                  {item![area.key as keyof limpiezasCleaningTypes]
                    ? check
                    : " "}
                  ] {area.label}
                </Text>
              ))}
            </View>

            <Text style={styles.label}>Intervención:</Text>
            <View style={styles.row}>
              {INTERVENCIONES.map((int) => (
                <Text key={int.key} style={styles.box}>
                  [
                  {item![int.key as keyof limpiezasCleaningTypes] ? check : " "}
                  ] {int.label}
                </Text>
              ))}
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Insumos:</Text>
              <Text>{item!.insumosutilizados}</Text>
            </View>
          </View>
        ))}

        {/* Firma */}
        <View style={styles.firma}>
          <Text>__________________________________________</Text>
          <Text>Firma del Responsable</Text>
        </View>
      </Page>
    </Document>
  );
};
