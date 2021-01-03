const regVideoIdOnly = /(^\s*[^&?]{11}\s*$)/;
const regNormal = /v=([^&?]{11})(?=$|[=&?])/;
const regShort = /youtu\.be\/([^&?]{11})(?=$|[=&?])/;
const regEmbed = /embed\/([^&?]{11})(?=$|[=&?])/;

export const extractVideoId = (urlOrVideoId: string) => {
  if (urlOrVideoId.includes('[')) {
    urlOrVideoId = urlOrVideoId.replace('[', '').replace(']', '');
  }
  if (regVideoIdOnly.exec(urlOrVideoId)) {
    return regVideoIdOnly.exec(urlOrVideoId)![1];
  }
  if (regNormal.exec(urlOrVideoId)) {
    return regNormal.exec(urlOrVideoId)![1];
  }
  if (regShort.exec(urlOrVideoId)) {
    return regShort.exec(urlOrVideoId)![1];
  }
  if (regEmbed.exec(urlOrVideoId)) {
    return regEmbed.exec(urlOrVideoId)![1];
  }
  return null;
};
