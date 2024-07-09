const acc_ui = {
  create(acc){
    return new TagString(`<div class="acc">
            <ion-icon name="person-outline"></ion-icon>
            <div class="sp">
            <div class="name">${acc.name}</div>
            <p><strong>Email:</strong> ${acc.email}</p>
            <p><strong>Device:</strong> ${(acc.device ? acc.device : 'no information about device')}</p>
            <p><strong>Location:</strong> ${(acc.location ? acc.location : 'location not saved')}</p>
            <p><strong>Id:</strong> ${(acc._id)}</p>
            <p><strong>Date:</strong> ${(acc.date ? acc.date : 'no about date')}</p>
            <p><strong>Languages:</strong> ${(acc.languages ? acc.languages : 'no information about languages')}</p>
            <p><strong>Platform:</strong> ${(acc.platform ? acc.platform : 'no information about platform or OS')}</p>
            <p><strong>Brands & Version ( JSON ):</strong> ${(acc.brandsAndVersion ? acc.brandsAndVersion : 'no information about brands and version')}</p>
            <span>unsubscriber</span>
            </div>
          </div>`)
  },
  createTitleBar(xhr){
    return new TagString(`<p class="acc gr">
            <ion-icon name="people-outline"></ion-icon>
            <sp class="sp">${JSON.parse(xhr.response).length} Accounts</sp>
            <span class="sp">[ ${xhr.status} ]</span>
          </p>`)
  }
}