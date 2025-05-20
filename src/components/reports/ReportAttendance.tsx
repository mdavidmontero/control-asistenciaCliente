import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import type { HistoryAttendances } from "@/types";
import { formatDate, formatDateTime } from "@/lib/utils";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: "Helvetica",
    lineHeight: 1.4,
  },
  logo: {
    width: 100,
    height: 60,
    objectFit: "contain",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  titleBlock: {
    textAlign: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  subtitle: {
    fontSize: 12,
    marginTop: 4,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#e4e4e4",
    padding: 5,
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 4,
    paddingHorizontal: 5,
    borderBottom: "1px solid #ccc",
  },
  col: {
    flex: 1,
    textAlign: "center",
  },
  dateCol: {
    flex: 1.2,
    textAlign: "center",
  },
  footer: {
    marginTop: 40,
    textAlign: "right",
    fontStyle: "italic",
  },
});

interface Props {
  data: HistoryAttendances[];
  personName: string;
  logoUrl?: string;
  companyName?: string;
}

export function AttendanceReport({
  data,
  personName,
  logoUrl = "/logo.png",
  companyName = "Seynekun",
}: Props) {
  const today = new Date();

  return (
    <Document>
      <Page style={styles.page} size="A4">
        <View style={styles.header}>
          <Image src={logoUrl} style={styles.logo} />
          <Text>{formatDate(today.toString())}</Text>
        </View>

        <View style={styles.titleBlock}>
          <Text style={styles.title}>{companyName}</Text>
          <Text style={styles.subtitle}>Reporte de Asistencias</Text>
          <Text style={styles.subtitle}>Nombre: {personName}</Text>
        </View>

        <View style={styles.tableHeader}>
          <Text style={styles.dateCol}>Fecha</Text>
          <Text style={styles.col}>Entrada Mañana</Text>
          <Text style={styles.col}>Salida Mañana</Text>
          <Text style={styles.col}>Entrada Tarde</Text>
          <Text style={styles.col}>Salida Tarde</Text>
        </View>

        {data.map((attendance, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.dateCol}>{formatDate(attendance!.date)}</Text>
            <Text style={styles.col}>
              {attendance!.morningIn
                ? formatDateTime(attendance!.morningIn)
                : "—"}
            </Text>
            <Text style={styles.col}>
              {attendance!.morningOut
                ? formatDateTime(attendance!.morningOut)
                : "—"}
            </Text>
            <Text style={styles.col}>
              {attendance!.afternoonIn
                ? formatDateTime(attendance!.afternoonIn)
                : "—"}
            </Text>
            <Text style={styles.col}>
              {attendance!.afternoonOut
                ? formatDateTime(attendance!.afternoonOut)
                : "—"}
            </Text>
          </View>
        ))}

        <Text style={styles.footer}>
          Reporte generado automáticamente por el sistema
        </Text>
      </Page>
    </Document>
  );
}
