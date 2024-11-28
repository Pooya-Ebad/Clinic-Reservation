import {parsePhoneNumber} from "libphonenumber-js";

//return phonNumber with specific format
export function mobileValidation(mobile: string) {
  const result = parsePhoneNumber(mobile, "IR");
  const phoneNumber = result.formatNational().replace(/[\s\(\)\-]*/gim, "");
  //   const phoneNumber = `0${result.nationalNumber}`;
  const fullNumber = result.getURI().replace("tel:", "");
  return {
    country_code: result.country,
    phone_code: `+${result.countryCallingCode}`,
    phoneNumber,
    fullNumber,
  };
}