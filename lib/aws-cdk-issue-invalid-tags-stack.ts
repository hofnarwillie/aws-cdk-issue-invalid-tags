import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {
  HttpApi,
  CorsHttpMethod,
  DomainName,
  EndpointType,
} from '@aws-cdk/aws-apigatewayv2-alpha';
import { PublicHostedZone } from 'aws-cdk-lib/aws-route53';
import { CertificateValidation, DnsValidatedCertificate } from 'aws-cdk-lib/aws-certificatemanager';

export class AwsCdkIssueInvalidTagsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const hostedZoneDomainName = process.env.DOMAIN_NAME as string;
    const subdomainName = `tags-issue.${hostedZoneDomainName}`;
    const hostedZone = PublicHostedZone.fromLookup(
      this,
      'PublicHostedZone',
      {
        domainName: hostedZoneDomainName,
      },
    );
    const validatedCertificate = new DnsValidatedCertificate(
      this,
      'API Subdomain Certificate',
      {
        domainName: subdomainName,
        hostedZone,
        validation: CertificateValidation.fromDns(hostedZone),
        cleanupRoute53Records: true,
      },
    );
    validatedCertificate.node.addDependency(hostedZone);
    const httpApiDomainName = new DomainName(this, 'SGGHttpDomainName', {
      domainName: subdomainName,
      certificate: validatedCertificate,
      endpointType: EndpointType.REGIONAL,
    });

    const httpApiGateway = new HttpApi(this, 'ApiGateway', {
      corsPreflight: {
        allowHeaders: ['*'],
        allowOrigins: ['*'],
        allowMethods: [
          CorsHttpMethod.HEAD,
          CorsHttpMethod.OPTIONS,
          CorsHttpMethod.GET,
          CorsHttpMethod.POST,
          CorsHttpMethod.PUT,
          CorsHttpMethod.DELETE,
        ],
      },
      disableExecuteApiEndpoint: true,
      defaultDomainMapping: {
        domainName: httpApiDomainName,
      },
    });
  }
}
