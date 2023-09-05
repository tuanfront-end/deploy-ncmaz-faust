import { MUTATION_ADD_SUBCRIBER_TO_MAILPOET } from "@/fragments/mutations";
import { useMutation } from "@apollo/client";
import React, { FC, useState } from "react";
import Input from "./Input/Input";
import ButtonCircle from "./Button/ButtonCircle";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Error from "./Error";
import { NC_SITE_SETTINGS } from "@/contains/site-settings";

interface Props {
  className?: string;
}

const AddSubscriberForm: FC<Props> = ({ className = "" }) => {
  const [email, setemail] = useState("");

  const [mutationAddSubscriber, { data, loading, error, reset, called }] =
    useMutation(MUTATION_ADD_SUBCRIBER_TO_MAILPOET, {
      variables: {
        listId: NC_SITE_SETTINGS.mailpoet_list_id,
      },
    });

  let ERR = "";
  let THANKS = "";

  if (data && called && data?.ncmazFaustAddSubscriberToMailpoet?.success) {
    // thank you message after success subscribe
    THANKS = NC_SITE_SETTINGS.subcription_widget.success_message;
  }

  if (data && called && !data?.ncmazFaustAddSubscriberToMailpoet?.success) {
    ERR =
      error?.message ||
      data?.ncmazFaustAddSubscriberToMailpoet?.errors ||
      NC_SITE_SETTINGS.subcription_widget.error_message;
  }

  return (
    <form
      className={`relative ${className}`}
      onSubmit={(e) => {
        e.preventDefault();
        if (!email) {
          return;
        }
        // regex check email validation
        if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
          return;
        }
        mutationAddSubscriber({
          variables: {
            user_email: email,
          },
        });
      }}
    >
      <div className="relative">
        <Input
          required
          aria-required
          placeholder={NC_SITE_SETTINGS.subcription_widget.placeholder}
          type="email"
          onChange={(e) => setemail(e.target.value)}
        />
        <ButtonCircle
          type="submit"
          className="absolute transform top-1/2 -translate-y-1/2 end-1 dark:bg-neutral-300 dark:text-black"
          disabled={loading}
        >
          <ArrowRightIcon className="w-5 h-5 rtl:rotate-180" />
        </ButtonCircle>
      </div>

      {ERR ? <Error className="mt-2 text-xs" error={ERR} /> : null}
      {THANKS ? (
        <div className="mt-2 text-green-600 text-xs italic">{THANKS}</div>
      ) : null}
    </form>
  );
};

export default AddSubscriberForm;
