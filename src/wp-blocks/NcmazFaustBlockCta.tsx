import { NcmazFaustBlockCtaFragmentFragment } from "@/__generated__/graphql";
import { NC_SITE_SETTINGS } from "@/contains/site-settings";
import { MUTATION_ADD_SUBCRIBER_TO_MAILPOET } from "@/fragments/mutations";
import errorHandling from "@/utils/errorHandling";
import { gql, useMutation } from "@apollo/client";
import { WordPressBlock } from "@faustwp/blocks";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

const NcmazFaustBlockCta: WordPressBlock<NcmazFaustBlockCtaFragmentFragment> = (
  props
) => {
  const { renderedHtml } = props || {};

  const initErrorMessage = NC_SITE_SETTINGS.subcription_widget.error_message;
  const initSuccessMessage =
    NC_SITE_SETTINGS.subcription_widget.success_message;
  const blockRef = React.useRef<HTMLDivElement>(null);

  const [mutationAddSubscriber, { data, loading, called }] = useMutation(
    MUTATION_ADD_SUBCRIBER_TO_MAILPOET,
    {
      variables: {
        listId: NC_SITE_SETTINGS.mailpoet_list_id,
      },
      onCompleted: (data) => {
        if (data?.ncmazFaustAddSubscriberToMailpoet?.success) {
          toast.success(initSuccessMessage);
          const successNode = blockRef.current?.querySelector(
            ".ncmazfaust-block-CTA__subcribe_success"
          );
          if (successNode) {
            successNode.innerHTML = initSuccessMessage;
          }
        } else {
          toast.error(
            data?.ncmazFaustAddSubscriberToMailpoet?.errors || initErrorMessage
          );
          const errorNode = blockRef.current?.querySelector(
            ".ncmazfaust-block-CTA__subcribe_success"
          );
          if (errorNode) {
            errorNode.innerHTML =
              data?.ncmazFaustAddSubscriberToMailpoet?.errors ||
              initErrorMessage;
          }
        }
      },
      onError: (error) => {
        errorHandling(error);

        const errorNode = blockRef.current?.querySelector(
          ".ncmazfaust-block-CTA__subcribe_success"
        );
        if (errorNode) {
          errorNode.innerHTML = error.message || initErrorMessage;
        }
      },
    }
  );

  useEffect(() => {
    if (!called) {
      return;
    }
    // add loading dom to form DOM
    const subcribeFormNode = blockRef.current?.querySelector(
      ".ncmazfaust-block-CTA__subcribe_form"
    );
    if (!subcribeFormNode) {
      return;
    }
    const submitButton = subcribeFormNode.querySelector(
      "button[type='submit']"
    );
    const errorNode = blockRef.current?.querySelector(
      ".ncmazfaust-block-CTA__subcribe_success"
    );
    const successNode = blockRef.current?.querySelector(
      ".ncmazfaust-block-CTA__subcribe_success"
    );

    if (loading) {
      submitButton?.setAttribute("disabled", "disabled");
      !!errorNode && errorNode.innerHTML && (errorNode.innerHTML = "");
      !!successNode && successNode.innerHTML && (successNode.innerHTML = "");
    } else {
      submitButton?.removeAttribute("disabled");
    }
  }, [loading, called]);

  useEffect(() => {
    const subcribeFormNode = blockRef.current?.querySelector(
      ".ncmazfaust-block-CTA__subcribe_form"
    );
    if (!subcribeFormNode) {
      return;
    }

    //  handle submit form here
    subcribeFormNode.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = subcribeFormNode.querySelector<HTMLInputElement>(
        "input[type='email']"
      )?.value;

      // regex check email validation
      if (
        !email ||
        !email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
      ) {
        toast.error("Email is invalid");
        return;
      }

      mutationAddSubscriber({
        variables: {
          user_email: email,
        },
      });
    });
  }, [blockRef]);

  return (
    <>
      <div
        ref={blockRef}
        className="not-prose"
        dangerouslySetInnerHTML={{ __html: renderedHtml || "" }}
      />
    </>
  );
};

export const NcmazFaustBlockCtaFragments = {
  entry: gql`
    fragment NcmazFaustBlockCtaFragment on NcmazFaustBlockCta {
      renderedHtml
    }
  `,
  key: `NcmazFaustBlockCtaFragment`,
};

NcmazFaustBlockCta.displayName = "NcmazFaustBlockCta";
export default NcmazFaustBlockCta;
