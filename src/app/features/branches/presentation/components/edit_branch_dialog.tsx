import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function EditBranchDialog() {
  return (
    <>
      <FieldGroup>
        <Field>
          <Label htmlFor="name-1">Name</Label>
          <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
        </Field>
        <Field>
          <Label htmlFor="username-1">Username</Label>
          <Input id="username-1" name="username" defaultValue="@peduarte" />
        </Field>
      </FieldGroup>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </>
  );
}
