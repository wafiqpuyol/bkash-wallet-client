'use client';

import { renderButtons, renderCreateButton, renderRefreshButtons, renderTableAndPagination } from './HomeComponent';
import { useHome } from '@/hooks/status/useHome';
import { MonitorSelectionModal } from '@/components/MonitorSelectionModal';
import { HomeSkeleton } from './HomeSkeleton';

export const Home: React.FC = () => {
    const {
        monitorState,
        monitors,
        limit,
        isRefreshed,
        monitorsRef,
        view,
        loading,
        openModal,
        setView,
        updateLimit,
        setMonitors,
        setMonitorState,
        refreshMonitors,
        enableAutoRefresh,
        closeUptimeModal
    } = useHome();
    return (
        <>
            {(monitorState.showModal || openModal) && (
                <MonitorSelectionModal
                    onClose={() => {
                        setMonitorState({ ...monitorState, showModal: false });
                        closeUptimeModal();
                    }}
                />
            )}
            <div className="m-auto px-6 h-screen relative min-h-screen xl:container md:px-12 lg:px-6">
                {loading && <HomeSkeleton />}
                <>
                    {!loading && monitors.length > 0 ? (
                        <>
                            {renderButtons(monitors, monitorState, setMonitorState)}
                            {renderRefreshButtons(
                                view,
                                isRefreshed!,
                                monitorsRef.current,
                                monitors,
                                setView,
                                setMonitors,
                                () => refreshMonitors(),
                                () => enableAutoRefresh(),
                            )}
                            {renderTableAndPagination(
                                view,
                                limit,
                                monitorState.autoRefreshLoading,
                                monitors,
                                updateLimit
                            )}
                        </>
                    ) : (
                        <>
                            {!loading && !monitors.length && (
                                <>{renderCreateButton(monitorState, setMonitorState)}</>
                            )}
                        </>
                    )}
                </>
            </div>
        </>
    )
}
