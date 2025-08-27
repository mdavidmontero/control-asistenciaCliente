import { getEquimentById } from "@/actions/cleaning-equipment.actions";
import { FormCleaningEquipmentEdit } from "@/components/cleaningEquipmentCenter/FormCleaningEquipmentEdit";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router";

export default function EditEquimentView() {
  const params = useParams();
  const equipmentId = +params.id!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["editEquipment", equipmentId],
    queryFn: () => getEquimentById(+equipmentId!),
    retry: false,
  });

  if (isLoading) return "Cargando";
  if (isError) return <Navigate to={"/404"} />;
  if (data)
    return <FormCleaningEquipmentEdit data={data} equipmentId={equipmentId} />;
}
