// src/features/items/AddItemForm.jsx
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import Form from "../ui/Form";
import FormRow from "../ui/FormRow";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Textarea from "../ui/Textarea";
import FileInput from "../ui/FileInput";

// import { createItem, addItemImages } from "../../services/apiItems";
import { handleItemSubmission } from "../services/handleItemSubmission";

function AddItemForm() {
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;
  const queryClient = useQueryClient();

  const { mutate: handleSubmission, isLoading: isCreating } = useMutation({
    mutationFn: handleItemSubmission,
    // async (formData) => {
    //   const coverImageFile = formData.coverImage[0];
    //   const itemImages = formData.itemImages || [];

    //   console.log(coverImageFile);
    //   console.log(itemImages);

    //   const { item } = await createItem({
    //     name: formData.name,
    //     type: formData.type,
    //     description: formData.description,
    //     coverImage: coverImageFile,
    //   });

    //   if (itemImages.length > 0) {
    //     await addItemImages([...itemImages], item.id);
    //   }

    //   return item;
    // },
    onSuccess: () => {
      toast.success("Item successfully added");
      queryClient.invalidateQueries({ queryKey: ["items"] });
      reset();
    },
    onError: (err) => {
      console.error(err);
      toast.error(err.message || "Error creating item");
    },
  });

  function onSubmit(data) {
    console.log(data);
    console.log(data.coverImage[0]);
    handleSubmission({ ...data, coverImage: data.coverImage[0] });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Item name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isCreating}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Item type" error={errors?.type?.message}>
        <Input
          type="text"
          id="type"
          disabled={isCreating}
          {...register("type", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
          id="description"
          disabled={isCreating}
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Cover image" error={errors?.coverImage?.message}>
        <FileInput
          id="coverImage"
          accept="image/*"
          {...register("coverImage", {
            required: "Cover image is required",
          })}
        />
      </FormRow>

      <FormRow label="Item Images (optional)">
        <FileInput
          id="itemImages"
          accept="image/*"
          multiple
          {...register("itemImages")}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset" disabled={isCreating}>
          Reset
        </Button>
        <Button disabled={isCreating}>Add Item</Button>
      </FormRow>
    </Form>
  );
}

export default AddItemForm;
