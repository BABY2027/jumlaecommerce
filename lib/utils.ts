export const isValidPhone = (phone: string) => {
  const cleaned = phone.replace(/\D/g, "");
  return /^[0-9]{9,14}$/.test(cleaned);
};

export const isValidPrice = (value: string) => {
  const cleaned = value.trim();
  return /^[0-9]+(\.[0-9]{1,2})?$/.test(cleaned) && parseFloat(cleaned) > 0;
};

export const sanitizeText = (value: string) => value.trim();

export const safeOpenUrl = (url: string) => {
  if (!/^https?:\/\//i.test(url)) return;
  window.open(url, "_blank", "noreferrer");
};

export const safeWhatsApp = (phone: string, message: string) => {
  const cleaned = phone.replace(/\D/g, "");
  if (!isValidPhone(cleaned)) return false;
  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/${cleaned}?text=${encoded}`, "_blank", "noreferrer");
  return true;
};
export const isValidPhoneNumber = (phone: string) => {
  const cleaned = phone.replace(/\D/g, "");
  return /^255\d{9}$/.test(cleaned);
};

export const maskPhoneNumber = (phone: string) => {
  const cleaned = phone.replace(/\D/g, "");
  if (!/^255\d{9}$/.test(cleaned)) return phone;
  return `${cleaned.slice(0, 5)}****${cleaned.slice(-4)}`;
};

export const sanitizeString = (value: string) =>
  value.trim().replace(/[\u0000-\u001F\u007F]/g, "");

export const parsePositiveNumber = (value: string) => {
  const normalized = value.toString().replace(/[^0-9.]/g, "");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : NaN;
};
