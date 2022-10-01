let initialState = {
    friends: [
      {
        id: 2,
        name: "Катя",
        ava: "https://yandex-images.clstorage.net/SoHK51217/4e70feOXkfdU/MrY9UCIzp23GTrCqLzzObENypcPBU9xekwtOYoIzrglX9giokbPToAf_kraBUCwYNdHtc1q3H49f-wKiJiSDMVZy_OHGwwd9xn5gO5-svtzDgiWCgSP52-K-LvPHppoNZ3Z-O3Yk0aa1GcVh05KdyGB0uGKOMz656TvUxdOTZUWyxK1TZMM1bMBdM6u_TE8b4NO0BcM0rh_nrS2gsDR5LSJjvqrldmAkZUo0owGSTAoiR4qD2XFf-jvthacToYVlYvQ_cBYR5g7Az2Honb5NK_LA5OcCZH5-VCwvAFJEiW5CQ10oxNXTR6d4ZdPBsm6YIfbaAVqg7RoLvNfmAGG1NTJW7GGmYzY-ErwQy91uzqnxwVcFkIWt7hRdXmAANhrMwQLu6mZGcad3KFVQwjJu-sPVqAE48N6qu72210MjVoQDVY5ghgFWL8MscMqdPh5JgaO216EnX56Gzr8gcDa7n_Pxzynk5vDX5YiWgeOS3knx19lRm9L_-um8xIUwY1R1ItZNAXXhtzxC7mMr_h2POoMD9JXCt4_8FF1eEaBX6C8B8R2qZmWx9Maa9aDQI007MdfoAmtTfXk5zbSncSBmhKMHD3BWI1ZegE_g6G1ubrmhU3Z1I5SOjCXeDRPgtrve0iMc2hTEgqYESgaDsaD8-KH3-wHYkUyKua-U1ZLxl5RjlA6jZEL1jJOsAmiMP8yLkVKkF-PXXlyF7mzysNVrrAGD_NnEZCFH9yt3AgIT_shD5NqAekLfyilsdZYjkxcWEsYPY-ahBo9j7BEZbA_PmHOARBaylh2txP-fgtBWCRywE685JtaztOfKZOMiIM9JAIRYsjlAD7s7bUeE8CE2lsG3bIAGYFQOQQ3Tqm0s_nuwA1WUckdfr-XvPKOgdDlMMiM-q5Vk4wZXKhTR84DNeXKmCPJogL-JeA9nJPFy9pUhJr3wJ5BVzpAfAqi_nf7rsAKmpHJm7V4kT62z0",
      },
      {
        id: 3,
        name: "Егор",
        ava: "https://avatars.mds.yandex.net/i?id=c574557fdd82c2283b2c3d0b4d839b49-5878100-images-thumbs&n=13&exp=1",
      },
      {
        id: 4,
        name: "Вика",
        ava: "https://avatars.mds.yandex.net/i?id=e84d539fb4a301289790d093a8218a7b-4217228-images-thumbs&n=13&exp=1",
      },
    ],
  }

const sidebarReducer = (state = initialState, action) => {

    return {
      ...state
    }
}


export default sidebarReducer;