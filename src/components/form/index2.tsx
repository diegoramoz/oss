import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts();

export function TextField({ label }: { label: string }) {
  const field = useFieldContext<string>();
  return (
    <label>
      <span>{label}</span>
      <input
        onChange={(e) => field.handleChange(e.target.value)}
        value={field.state.value}
      />
    </label>
  );
}

export function SubscribeButton({ label }: { label: string }) {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <button disabled={isSubmitting} type="button">
          {label}
        </button>
      )}
    </form.Subscribe>
  );
}

export const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    TextField,
  },
  formComponents: {
    SubscribeButton,
  },
  fieldContext,
  formContext,
});
