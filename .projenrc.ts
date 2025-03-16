import { awscdk } from 'projen';
import { CdkCICDWrapper } from '@cdklabs/cdk-cicd-wrapper-projen';

const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: '2.1.0',
  defaultReleaseBranch: 'main',
  deps: ['@cdklabs/cdk-cicd-wrapper'],
  name: 'project',
  projenrcTs: true,
});

//@ts-ignore Projen Versions can be different during the upgrade process and would resolve complains about assignability issues.
new CdkCICDWrapper(project, {
  cdkQualifier: 'wrapper',
  repositoryName: 'jumic/pipeline-ci-cd-wrapper-projen',
  repositoryType: 'GITHUB', // Must be 'GITHUB' for a codestar connection
  stages: [ // Must be a list of all stages other than RES and may include custom stages
    'DEV',
    'INT',
    'PROD',
 ],
});

project.synth();