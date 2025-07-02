import { expect } from '@open-wc/testing';
import sinon from 'sinon';

import { AnalyticsHandler } from '../src/analytics-handler';

describe('AnalyticsHandler', () => {
  let handler: AnalyticsHandler;
  let sendPingSpy: sinon.SinonSpy;
  let sendEventSpy: sinon.SinonSpy;
  let sendEventNoSamplingSpy: sinon.SinonSpy;

  beforeEach(() => {
    handler = new AnalyticsHandler({ enableAnalytics: true });
    sendPingSpy = sinon.spy(handler, 'sendPing');
    sendEventSpy = sinon.spy(handler, 'sendEvent');
    sendEventNoSamplingSpy = sinon.spy(handler, 'sendEventNoSampling');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should initialize with analytics enabled', () => {
    expect(handler).to.be.instanceOf(AnalyticsHandler);
  });

  it('should call sendPing', () => {
    const values = { key: 'value' };
    handler.sendPing(values);
    expect(sendPingSpy).to.be.calledOnce;
    expect(sendPingSpy).to.be.calledWith(values);
  });

  it('should call sendEvent', () => {
    const event = {
      category: 'search',
      action: 'sort by category',
      label: 'sorted asc order by category',
    };
    handler.sendEvent(event);
    expect(sendEventSpy).to.be.calledOnce;
    expect(sendEventSpy).to.be.calledWith(event);
  });

  it('should call sendEventNoSampling on analyticsHandler', () => {
    const event = { category: 'test', action: 'no-sampling' };
    handler.sendEventNoSampling(event);

    expect(sendEventNoSamplingSpy).to.be.calledOnce;
    expect(sendEventNoSamplingSpy).to.be.calledWith(event);
  });
});
