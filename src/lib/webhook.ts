export const MAKE_WEBHOOK_URL =
  "https://hook.eu1.make.com/7qfa9sg38ks3qpr8qcvmi69avcfe2f36";

// Same Make Gmail sender used by skincareVending invoices. Override if a dedicated brochure scenario is added.
export const BROCHURE_EMAIL_WEBHOOK_URL =
  process.env.BROCHURE_EMAIL_WEBHOOK_URL?.trim() ||
  "https://hook.eu1.make.com/g8odvmr2rp4er2n63dhmo3ku3uqbi4nu";

export const FORM_IMAGES = {
  logoUrl:
    "https://raw.githubusercontent.com/Ranjithk11/newbeautyPod/main/public/images/logo.jpg",
  machineImageUrl:
    "https://raw.githubusercontent.com/Ranjithk11/newbeautyPod/main/public/images/beautypod-machine.jpg",
  brochureUrl:
    "https://raw.githubusercontent.com/Ranjithk11/newbeautyPod/main/public/beautypod-brochure.jpg",
};
