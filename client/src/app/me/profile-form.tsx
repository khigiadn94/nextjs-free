"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { handleErrorApi } from "@/lib/utils";
import { useState } from "react";
import {
  AccountResType,
  UpdateMeBody,
  UpdateMeBodyType,
} from "@/schemaValidations/account.schema";
import accountApiRequest from "@/apiRequests/account";
import { toast } from "sonner";

type Profile = AccountResType["data"];

const ProfileForm = ({ profile }: { profile: Profile }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<UpdateMeBodyType>({
    resolver: zodResolver(UpdateMeBody),
    defaultValues: {
      name: profile.name,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: UpdateMeBodyType) {
    if (loading) return;
    setLoading(true);
    try {
      const result = await accountApiRequest.updateMe(values);
      toast.success(result.payload.message);
      router.refresh();
    } catch (error: any) {
      handleErrorApi({
        error,
        setError: form.setError,
      });
    } finally {
      setLoading(false);
    }
  }
  return (
    <Form {...form}>
      <div className="max-w-md mx-auto px-4">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
        >
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input
              placeholder="shadcn"
              type="email"
              value={profile.email}
              readOnly
            />
          </FormControl>
          <FormMessage />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="!mt-8 w-full">
            Update
          </Button>
        </form>
      </div>
    </Form>
  );
};

export default ProfileForm;
