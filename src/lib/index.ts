
const site = new NextjsSite(stack, "site", {
    customDomain: {
      domainName: "nove.profi-sh.cz",
      hostedZone: "profi-sh.cz",
    },
});