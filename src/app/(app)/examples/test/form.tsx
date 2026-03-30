"use client";

import { formOptions } from "@tanstack/react-form";
import { useAppForm, withForm } from "@/components/form/index2";
import { createUserFormSchema } from "../input/form/schema";

const formOpts = formOptions({
  defaultValues: {
    username: "",
    email: "",
  },
  validators: {
    onChange: createUserFormSchema,
  },
});

export const ChildForm = withForm({
  ...formOpts,
  // Optional, but adds props to the `render` function outside of `form`
  props: {
    title: "Child Form",
  },
  render: ({ form, title }) => {
    return (
      <div>
        <p>{title}</p>
        <form.AppField name="username">
          {(field) => {
            return <field.TextField label="Username" />;
          }}
        </form.AppField>
        <form.AppField name="email">
          {(field) => {
            return <field.TextField label="Email" />;
          }}
        </form.AppField>
        <form.AppForm>
          <form.SubscribeButton label="Submit" />
        </form.AppForm>
      </div>
    );
  },
});

export const Parent = () => {
  const form = useAppForm({
    ...formOpts,
  });

  return <ChildForm form={form} title={"Testing"} />;
};
