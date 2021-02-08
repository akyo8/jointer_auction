'use strict';
var TokenList = function () { }


TokenList.tokens = [
    { name: "JNTR", requireApprove: true, sentAllow: true, receiveAllow: false, src: "/images/jntr_note/jntrnote-icon01.png" },
    { name: "JNTR/EQUITY", requireApprove: true, sentAllow: false, receiveAllow: false, src: "/images/jntr_note/jntretn-icon01.png" },
    { name: "JNTR/STOCK", requireApprove: true, sentAllow: false, receiveAllow: false, src: "/images/jntr_note/jntrstock-icon01.png" },
    { name: "EZO", requireApprove: true, sentAllow: false, receiveAllow: false, src: "/images/jntr_note/ezocoin-icon.png" },
    { name: "PAX", requireApprove: true, sentAllow: false, receiveAllow: false, src: "/images/jntr_note/pax-coin.png" },
    { name: "Ethereum", requireApprove: true, sentAllow: false, receiveAllow: true, src: "/images/jntr_note/ethcoin-icon.png" },
    { name: "USD coin", requireApprove: true, sentAllow: false, receiveAllow: false, src: "/images/jntr_note/usd-coin.png" },
    { name: "True USD", requireApprove: true, sentAllow: false, receiveAllow: false, src: "/images/jntr_note/true-usd-coin.png" },
    { name: "DAI", requireApprove: true, sentAllow: false, receiveAllow: false, src: "/images/jntr_note/dai-coin.png" },
    { name: "Gemini", requireApprove: true, sentAllow: false, receiveAllow: false, src: "/images/jntr_note/gemini-coin.png" },
    { name: "Bitcoin", requireApprove: true, sentAllow: false, receiveAllow: false, src: "/images/jntr_note/bitcoin.png" },
];

TokenList.Contraints = {
    null: { requireApprove: false },
    "JNTR": { requireApprove: true },
    "JNTR/EQUITY": { requireApprove: false },
    "JNTR/STOCK": { requireApprove: false },
    "EZO": { requireApprove: false },
    "PAX": { requireApprove: false },
    "Ethereum": { requireApprove: false },
    "USD coin": { requireApprove: false },
    "True USD": { requireApprove: false },
    "DAI": { requireApprove: false },
    "Gemini": { requireApprove: false },
    "Bitcoin": { requireApprove: false },
}

TokenList.tokenPair = {
    "JNTR": {
        "Ethereum": [
            "0xdd902f73e59e03e3ec1131dc9c57a5e49cb19cb8",
            "0xa68749E9e6a6B5bfBE43F3A453A16342C5b38AB3",
            "0xD368b98d03855835E2923Dc000b3f9c2EBF1b27b"
        ]
    }
}

module.exports = TokenList;