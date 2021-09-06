import * as React from "react";
import * as submissionStyles from "./submission-zone.module.css";
import { useFormikContext } from "formik";
import { Trans, t } from "@lingui/macro";

const SubmissionZone = () => {
  const { submitForm, values, isSubmitting } = useFormikContext();

  const courses = {
    "": 0,
    "Phase 1 - Fall Semester": 3000,
    "Phase 2 - Fall Semester": 3000,
    "Phase 3 - Fall Semester": 3000,
  };
  const coursesI18n = {
    "": "",
    "Phase 1 - Fall Semester": t({
      id: "registerForm.submit.course1",
      message: "Phase 1 - Fall Semester",
    }),
    "Phase 2 - Fall Semester": t({
      id: "registerForm.submit.course2",
      message: "Phase 2 - Fall Semester",
    }),
    "Phase 3 - Fall Semester": t({
      id: "registerForm.submit.course3",
      message: "Phase 3 - Fall Semester",
    }),
  };
  const [course, setCourse] = React.useState("");
  const [hasGroupDiscount, setHasGroupDiscount] = React.useState(false);
  const [hasOtherDiscount, setHasOtherDiscount] = React.useState(false);
  const [installmentNum, setInstallmentNum] = React.useState(1);

  const [totalPrice, setTotalPrice] = React.useState(0);

  const currency = new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
  });
  React.useEffect(() => {
    let total = 0;
    setCourse(values.course);
    total = courses[values.course];

    if (values.groupDiscount) {
      setHasGroupDiscount(true);
      total = total - 100;
    } else {
      setHasGroupDiscount(false);
    }

    if (values.otherDiscount) {
      setHasOtherDiscount(true);
      total = total - 100;
    } else {
      setHasOtherDiscount(false);
    }

    if (values.installments === "One Payment") {
      total = total - 200;
      setInstallmentNum(1);
    } else {
      setInstallmentNum(2);
    }

    setTotalPrice(total);
  });
  return (
    <div className={submissionStyles.summary}>
      <p>
        <span className={submissionStyles.priceLabel}>
          <Trans id="registerForm.submit.price.label">Total:</Trans>
        </span>
        <span className={submissionStyles.price}>
          {currency.format(totalPrice)}
        </span>
      </p>
      <ul>
        <li>
          <Trans id="registerForm.submit.earlyDiscount">
            200TL Early Registration discount applied.
          </Trans>
        </li>
        {course ? (
          <li>{`${coursesI18n[course]} - ${currency.format(
            courses[course]
          )}`}</li>
        ) : null}
        {hasGroupDiscount ? (
          <li>
            <Trans id="registerForm.submit.groupDiscount">
              100TL Group discount applied.
            </Trans>
          </li>
        ) : null}
        {hasOtherDiscount ? (
          <li>
            <Trans id="registerForm.submit.otherDiscount">
              100TL Returning student discount applied.
            </Trans>
          </li>
        ) : null}
        {installmentNum === 1 ? (
          <li>
            <Trans id="registerForm.submit.oneDiscount">
              100TL One time payment discount applied.
            </Trans>
          </li>
        ) : null}
      </ul>
      {isSubmitting ? (
        <button disabled type="button">
          <Trans id="registerForm.submit.buttonSending">Submitting...</Trans>
        </button>
      ) : (
        <button disabled={isSubmitting} type="button" onClick={submitForm}>
          <Trans id="registerForm.submit.button">Register Now</Trans>
        </button>
      )}
    </div>
  );
};

export default SubmissionZone;
