import { toast } from "sonner";

const onsubmitErrorHandler = (error: any, toastId: string | number) => {
  if (error?.data?.message === "Validation Error") {
    toast.error(error?.data?.errorSources[0]?.message, { id: toastId });
  } else if (error?.error) {
    toast.error(error?.error, { id: toastId });
  } else if (error?.data?.message) {
    toast.error(error?.data?.message, { id: toastId });
  } else {
    toast.error("Something went wrong!", { id: toastId });
  }
};

export default onsubmitErrorHandler;
