import * as cdk from 'aws-cdk-lib';
import { PipelineBlueprint } from '@cdklabs/cdk-cicd-wrapper';
import { Construct } from 'constructs';
import { Queue } from 'aws-cdk-lib/aws-sqs';

const app = new cdk.App();

export class MyStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new Queue(this, 'MyQueue');

  }
}

PipelineBlueprint.builder().addStack({
  provide: (context) => {
    // Create your stacks here.  Note that the scope parameter must be `context.scope`, not `app`
    new MyStack(context.scope, `${context.blueprintProps.applicationName}MyStack`);
  }
}).synth(app);

