import Swal, { type SweetAlertIcon } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
interface AlertMessageProps {
  title: string;
  text: string;
  icon?: SweetAlertIcon | undefined;
  children?: React.ReactNode;
}
export default async function AlertMessage({
  title,
  text,
  icon,
  children,
}: AlertMessageProps) {
  MySwal.fire({
    title: title,
    text: text,
    icon: icon,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, Enviar",
  }).then((result) => {
    if (result.isConfirmed) {
      if (children) {
        return children;
      }
    }
  });
}
