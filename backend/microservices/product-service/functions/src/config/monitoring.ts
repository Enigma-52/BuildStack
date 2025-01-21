import monitoring from '@google-cloud/monitoring';

const client = new monitoring.MetricServiceClient();
const projectId = "buildr-ffca2";

export async function createCustomMetric(
    metricId: string, 
    value: number, 
    labels: Record<string, string> = {}
) {
    return;
    const projectName = client.projectPath(projectId!);

    const timeSeriesData = {
        metric: {
            type: `custom.googleapis.com/product_service/${metricId}`,
            labels: labels,
        },
        resource: {
            type: 'global',
            labels: {
                project_id: projectId,
            },
        },
        points: [
            {
                interval: {
                    endTime: {
                        seconds: Date.now() / 1000,
                    },
                },
                value: {
                    doubleValue: value,
                },
            },
        ],
    };

    try {
        await client.createTimeSeries({
            name: projectName,
            timeSeries: [timeSeriesData],
        });
    } catch (err) {
        console.error('Monitoring Error:', err);
    }
}