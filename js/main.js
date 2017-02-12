import {Application} from './Application';
import {ServiceLocator} from './ServiceLocator';
import {CoderadarAuthorizationService} from './service/CoderadarAuthorizationService';
import {CoderadarCommitService} from './service/CoderadarCommitService';
import {CoderadarMetricService} from './service/CoderadarMetricService';
import {MetricNameService} from './service/MetricNameService';

(function () {
    // register services
    ServiceLocator.getInstance().register('authorizationService', new CoderadarAuthorizationService());
    ServiceLocator.getInstance().register('commitService', new CoderadarCommitService());
    ServiceLocator.getInstance().register('metricService', new CoderadarMetricService());
    ServiceLocator.getInstance().register('metricNameService', new MetricNameService());

    var application = new Application();
    application.initialize();
})();