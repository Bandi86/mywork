export default function validateForm(
  billingData,
  shippingData,
  showShipping,
  contact,
  setErrors
) {
  function isNonZeroNumber(value) {
    return !isNaN(value) && value !== 0;
  }

  let formIsValid = true;
  const errors = {};

  // Billing Name
  if (!billingData.billingName) {
    formIsValid = false;
    errors.billingName = "Billing Name is required";
  } else if (billingData.billingName.length < 3) {
    formIsValid = false;
    errors.billingName = "Billing Name must be at least 3 characters long";
  }

  // Billing City
  if (!billingData.billingCity) {
    formIsValid = false;
    errors.billingCity = "Billing City is required";
  }

  // Billing Street
  if (!billingData.billingStreet) {
    formIsValid = false;
    errors.billingStreet = "Billing Street is required";
  }

  // Billing House Number
  if (!billingData.billingHouseNumber) {
    formIsValid = false;
    errors.billingHouseNumber = "Billing House Number is required";
  } else if (!isNonZeroNumber(billingData.billingHouseNumber)) {
    formIsValid = false;
    errors.billingHouseNumber =
      "Billing House Number must be a non-zero number";
  }

  // Billing Postcode
  if (!billingData.billingPostcode) {
    formIsValid = false;
    errors.billingPostcode = "Billing Postcode is required";
  } else if (billingData.billingPostcode.length < 4) {
    formIsValid = false;
    errors.billingPostcode = "Billing Postcode must be 4 digits long";
  }

  // Validate shipping data (if applicable)
  if (!showShipping) {
    if (!shippingData.shippingName) {
      formIsValid = false;
      errors.shippingName = "Shipping Name is required";
    }
    // Add more validation rules for shipping data if needed...
    if (!shippingData.shippingCity) {
      formIsValid = false;
      errors.shippingCity = "Shipping City is required";
    }
    if (!shippingData.shippingStreet) {
      formIsValid = false;
      errors.shippingStreet = "Shipping Street is required";
    }
    if (!shippingData.shippingHouseNumber) {
      formIsValid = false;
      errors.shippingHouseNumber = "Shipping House Number is required";
    } else if (!isNonZeroNumber(shippingData.shippingHouseNumber)) {
      formIsValid = false;
      errors.shippingHouseNumber =
        "Shipping House Number must be a non-zero number";
    }
    if (!shippingData.shippingPostcode) {
      formIsValid = false;
      errors.shippingPostcode = "Shipping Postcode is required";
    } else if (shippingData.shippingPostcode.length < 4) {
      formIsValid = false;
      errors.shippingPostcode = "Shipping Postcode must be 4 digits long";
    }
  }

  // Validate contact data
  if (!contact.email) {
    formIsValid = false;
    errors.email = "Email is required";
  } else {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(contact.email)) {
      formIsValid = false;
      errors.email = "Email is invalid";
    }
  }

  if (!contact.phone) {
    formIsValid = false;
    errors.phone = "Phone is required";
  } else if (!isNonZeroNumber(contact.phone)) {
    formIsValid = false;
    errors.phone = "Phone must be a non-zero number";
  }

  // Update the errors state with the validation results
  setErrors(errors);

  return formIsValid;
}
