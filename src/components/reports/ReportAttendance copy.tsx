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
    fontSize: 9,
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
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  subtitle: {
    fontSize: 11,
    marginTop: 2,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#e4e4e4",
    padding: 4,
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 3,
    paddingHorizontal: 4,
    borderBottom: "1px solid #ccc",
  },
  col: {
    flex: 1.2,
    textAlign: "center",
  },
  smallCol: {
    flex: 1,
    textAlign: "center",
  },
  largeCol: {
    flex: 1.8,
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

export function AttendanceReportAll({
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
          <Text style={styles.col}>Fecha</Text>
          <Text style={styles.col}>Nombre</Text>
          <Text style={styles.col}>Entrada Mañana</Text>
          <Text style={styles.col}>Salida Mañana</Text>
          <Text style={styles.largeCol}>Anotación Mañana</Text>
          <Text style={styles.col}>Entrada Tarde</Text>
          <Text style={styles.col}>Salida Tarde</Text>
          <Text style={styles.largeCol}>Anotación Tarde</Text>
        </View>

        {data.map((attendance, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.col}>{formatDate(attendance!.date)}</Text>
            <Text style={styles.col}>{attendance?.user?.name || "—"}</Text>

            <Text style={styles.col}>
              {attendance?.morningIn
                ? formatDateTime(attendance?.morningIn)
                : "—"}
            </Text>

            <Text style={styles.col}>
              {attendance?.morningOut
                ? formatDateTime(attendance?.morningOut)
                : "—"}
            </Text>

            <Text style={styles.largeCol}>
              {attendance?.anotacionesMorning || "—"}
            </Text>

            <Text style={styles.col}>
              {attendance?.afternoonIn
                ? formatDateTime(attendance?.afternoonIn)
                : "—"}
            </Text>

            <Text style={styles.col}>
              {attendance?.afternoonOut
                ? formatDateTime(attendance?.afternoonOut)
                : "—"}
            </Text>

            <Text style={styles.largeCol}>
              {attendance?.anotacionesAfternoon || "—"}
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
