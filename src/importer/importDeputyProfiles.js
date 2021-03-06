import { Scraper } from '@democracy-deutschland/scapacra';
import { DeputyProfileScraper } from '@democracy-deutschland/scapacra-bt';

import DeputyModel from '../models/Deputy';

export default async () => {
  Log.info('START DEPUTY PROFILES SCRAPER');
  try {
    await Scraper.scrape(new DeputyProfileScraper(), async dataPackage => {
      // Ignore those which have no webid (ausgeschieden)
      if (!dataPackage.data.id) {
        return null;
      }
      // Construct Database object
      const deputy = {
        URL: dataPackage.meta.url,
        webId: dataPackage.data.id,
        imgURL: dataPackage.data.imgURL,
        party: dataPackage.data.party,
        name: dataPackage.data.name,
        job: dataPackage.data.job,
        office: dataPackage.data.office,
        links: dataPackage.data.links,
        biography: dataPackage.data.biography,
        constituency: dataPackage.data.constituency,
        constituencyName: dataPackage.data.constituencyName,
        directCandidate: dataPackage.data.directCandidate,
        functions: dataPackage.data.functions,
        speechesURL: dataPackage.data.speechesURL,
        votesURL: dataPackage.data.votesURL,
        publicationRequirement: dataPackage.data.publicationRequirement.sort(),
      };
      // Update/Insert
      await DeputyModel.update({ webId: deputy.webId }, { $set: deputy }, { upsert: true });
      return null;
    });
  } catch (error) {
    Log.error(`Deputy Profiles Scraper failed ${error.message}`);
  }
  Log.info('FINISH DEPUTY PROFILES SCRAPER');
};
