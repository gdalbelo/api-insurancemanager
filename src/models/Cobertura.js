cobertura: {
    "_id" : ObjectId("5968dc7fd7332c21840ebf1f"),
    "id_prd_versao" : "2783|1",
    "cod_cob" : 879,
    "ordem" : 1,
    "nome" : "Atos profissionais",
    "des_cob" : "Custos relacionados à defesa e demais procedimentos legais, indenizações em ações judiciais ou decisões arbitrais. Inclui indenizações por danos corporais, danos materiais ou a perda de uma chance, acordos celebrados na esfera judicial ou extrajudicial, desde que com a anuência prévia e por escrito da Seguradora, e custos de contratação, mediante consentimento prévio da Seguradora, de serviços de publicidade, com o objetivo de reparar a reputação do Segurado, caso esta tenha sido danificada em decorrência de uma Reclamação coberta.",
    "tip_cob" : "BAS",
    "tip_ctr" : "OBR",
    "tip_isg" : "MOE",
    "tip_isg_lst" : null,
    "tip_lmx_isg" : "VLR",
    "val_min" : 0,
    "val_max" : 0,
    "val_lmx_min" : 0,
    "val_lmx_max" : 0,
    "vlr_tx_min" : 0,
    "pct_lmx_min" : 0,
    "pct_lmx_max" : 0,
    "des_tmp_frq" : null,
    "tip_vlr_frq" : "MOE",
    "vlr_frq" : 0,
    "res_isg" : 0,
    "vlr_pre" : null,
    "sel" : null,
    "lst" : [],
    "tip_des_cob" : null,
    "tip_rga" : null,
    "cob_obr_cta" : [],
    "flg_apr" : true,
    "inf_ext" : {
        "flag" : false,
        "tip" : null,
        "sel" : {},
        "lst" : []
    },
    "des_frq" : null,
    "val_pre_min" : 0,
    "pct_frq" : 0,
    "vlr_is_max_asc" : 0,
    "des_tmp_frq2" : null,
    "vlr_frq2" : 0,
    "pct_frq2" : 0
}

import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  id_prd_versao: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cobertura",
    required: true,
  },
  nome: {
    type: String,
    required: true,
  },
  des_cob: {
    type: String,
    required: true,
  },
  tip_cob: {
    type: String,
    required: true,
  },
  likes: {
    type: Array,
    required: true,
  },
  comments: {
    type: Array,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Post = mongoose.model("Cobertura", PostSchema);

export default Post;
